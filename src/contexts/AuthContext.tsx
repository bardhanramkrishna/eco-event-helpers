
import { createContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase, User } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string, location: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  signOut: () => Promise<void>;
  updateLocation: (location: string) => Promise<void>;
}

// Default values
const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateLocation: async () => {},
};

// Create context
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize auth on component mount
  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (session) {
          // Get user profile
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (userError) throw userError;
          
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          // Get user profile when auth state changes
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (!userError && userData) {
            setUser(userData);
          } else {
            console.error("Error fetching user data:", userError);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string, location: string) => {
    try {
      setLoading(true);
      
      // Sign in with Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        // Check if user profile exists
        const { data: userData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }

        // If profile exists, update location
        if (userData) {
          const { error: updateError } = await supabase
            .from('users')
            .update({ location })
            .eq('id', data.user.id);
          
          if (updateError) throw updateError;
        } else {
          // Create user profile if it doesn't exist
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email,
              location,
              role: 'individual',
            });
          
          if (insertError) throw insertError;
        }

        // Fetch updated user data
        const { data: updatedUser, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (fetchError) throw fetchError;
        setUser(updatedUser);
        
        toast({
          title: "Signed in successfully",
          description: "Welcome back!",
        });
        
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast({
        title: "Error signing in",
        description: error.message || "Failed to sign in. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      setLoading(true);
      
      // Sign up with Supabase auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email,
            location: userData.location || '',
            role: userData.role || 'individual',
            name: userData.name || null,
          });
        
        if (profileError) throw profileError;
        
        toast({
          title: "Account created",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast({
        title: "Error creating account",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      navigate('/auth');
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: error.message || "Failed to sign out. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user's location
  const updateLocation = async (location: string) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('users')
        .update({ location })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local user state
      setUser({
        ...user,
        location,
      });
      
      toast({
        title: "Location updated",
        description: "Your event location has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error updating location:", error);
      toast({
        title: "Error updating location",
        description: error.message || "Failed to update location. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Auth context value
  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateLocation
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
