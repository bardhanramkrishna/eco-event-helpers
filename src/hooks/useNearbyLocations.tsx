
import { useState, useEffect } from 'react';
import { supabase, Location, LocationType } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface PaginationOptions {
  page: number;
  pageSize: number;
}

interface UseNearbyLocationsResult {
  locations: Location[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  setPage: (page: number) => void;
}

export const useNearbyLocations = (
  userLocation: string | undefined, 
  type?: LocationType,
  paginationOptions: PaginationOptions = { page: 1, pageSize: 10 }
): UseNearbyLocationsResult => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(paginationOptions.page);
  const [pageSize] = useState<number>(paginationOptions.pageSize);
  const { toast } = useToast();

  const fetchLocations = async (page: number) => {
    if (!userLocation) {
      setLocations([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Calculate range for pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      
      // Build base query
      let query = supabase
        .from('locations')
        .select('*', { count: 'exact' })
        .ilike('city', `%${userLocation}%`);
      
      // Add type filter if specified
      if (type) {
        query = query.eq('type', type);
      }
      
      // Get count first
      const { count, error: countError } = await query;
      
      if (countError) throw countError;
      
      // Then get paginated data
      const { data, error: dataError } = await query
        .range(from, to)
        .order('name', { ascending: true });
      
      if (dataError) throw dataError;
      
      setTotalCount(count || 0);
      setLocations(data || []);
    } catch (err: any) {
      console.error('Error fetching locations:', err);
      setError(err.message);
      toast({
        title: 'Error',
        description: 'Failed to fetch nearby locations. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations(currentPage);
  }, [userLocation, type, currentPage, pageSize, toast]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  
  const fetchNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const fetchPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    locations,
    loading,
    error,
    totalCount,
    pagination: {
      currentPage,
      pageSize,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
    fetchNextPage,
    fetchPreviousPage,
    setPage,
  };
};
