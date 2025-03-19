
import { useState, useEffect } from 'react';
import { supabase, Location, LocationType } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useNearbyLocations = (userLocation: string | undefined, type?: LocationType) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLocations = async () => {
      if (!userLocation) {
        setLocations([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Build query
        let query = supabase
          .from('locations')
          .select('*')
          .ilike('city', `%${userLocation}%`);
        
        // Add type filter if specified
        if (type) {
          query = query.eq('type', type);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
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

    fetchLocations();
  }, [userLocation, type, toast]);

  return { locations, loading, error };
};
