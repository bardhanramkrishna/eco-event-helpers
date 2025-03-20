
import { useState, useEffect } from 'react';
import { supabase, Location, LocationType } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface PaginationState {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface UseNearbyLocationsReturn {
  locations: Location[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  nextPage: () => void;
  prevPage: () => void;
  setPageSize: (size: number) => void;
  refresh: () => void;
}

export const useNearbyLocations = (
  userLocation: string | undefined, 
  type?: LocationType
): UseNearbyLocationsReturn => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 6,
    totalCount: 0,
    totalPages: 1
  });
  const { toast } = useToast();

  const fetchLocations = async (resetPage: boolean = false) => {
    if (!userLocation) {
      setLocations([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const currentPage = resetPage ? 1 : pagination.page;
      const from = (currentPage - 1) * pagination.pageSize;
      const to = from + pagination.pageSize - 1;
      
      // First, get the total count
      let countQuery = supabase
        .from('locations')
        .select('id', { count: 'exact' })
        .ilike('city', `%${userLocation}%`);
      
      if (type) {
        countQuery = countQuery.eq('type', type);
      }
      
      const { count, error: countError } = await countQuery;
      
      if (countError) throw countError;
      
      // Then get the paginated data
      let query = supabase
        .from('locations')
        .select('*')
        .ilike('city', `%${userLocation}%`)
        .range(from, to)
        .order('name', { ascending: true });
      
      if (type) {
        query = query.eq('type', type);
      }
      
      const { data, error: dataError } = await query;
      
      if (dataError) throw dataError;
      
      setLocations(data || []);
      
      // Update pagination state
      const totalCount = count || 0;
      const totalPages = Math.max(1, Math.ceil(totalCount / pagination.pageSize));
      
      setPagination(prev => ({
        ...prev,
        page: resetPage ? 1 : prev.page,
        totalCount,
        totalPages
      }));
      
    } catch (err: any) {
      console.error('Error fetching locations:', err);
      setError(err.message || 'Failed to fetch locations');
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
    fetchLocations(true);
  }, [userLocation, type, pagination.pageSize]);

  const nextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
      fetchLocations(false);
    }
  };

  const prevPage = () => {
    if (pagination.page > 1) {
      setPagination(prev => ({ ...prev, page: prev.page - 1 }));
      fetchLocations(false);
    }
  };

  const setPageSize = (size: number) => {
    setPagination(prev => ({ ...prev, pageSize: size, page: 1 }));
  };

  const refresh = () => {
    fetchLocations(false);
  };

  return { 
    locations, 
    loading, 
    error,
    pagination,
    nextPage,
    prevPage,
    setPageSize,
    refresh
  };
};
