
import { createClient } from '@supabase/supabase-js';

// These should be stored properly in the Supabase integration secrets
// but for now we'll use public variables since they're needed on the client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please connect Supabase integration in Lovable');
}

// Create a custom object type for our database
export type Database = {
  public: {
    tables: {
      users: {
        Row: {
          id: string;
          email: string;
          location: string;
          role: 'event_manager' | 'individual';
          name: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          location: string;
          role?: 'event_manager' | 'individual';
          name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          location?: string;
          role?: 'event_manager' | 'individual';
          name?: string | null;
          created_at?: string;
        };
      };
      locations: {
        Row: {
          id: string;
          name: string;
          type: 'orphanage' | 'recycling' | 'biogas';
          city: string;
          address: string;
          contact: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: 'orphanage' | 'recycling' | 'biogas';
          city: string;
          address: string;
          contact?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: 'orphanage' | 'recycling' | 'biogas';
          city?: string;
          address?: string;
          contact?: string | null;
          created_at?: string;
        };
      };
    };
  };
};

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Export types
export type User = Database['public']['tables']['users']['Row'];
export type Location = Database['public']['tables']['locations']['Row'];
export type LocationType = 'orphanage' | 'recycling' | 'biogas';
