
import { createContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

// Define the shape of our user data
interface User {
  id: string;
  email: string;
  name?: string;
  role?: "event_manager" | "individual";
  location?: string;
}

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, location: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  signOut: () => Promise<void>;
}

// Default values
const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
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

  // Initialize auth on component mount
  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        // For demo purposes, check local storage for user data
        const storedUser = localStorage.getItem("ecoGenUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  // Sign in with magic link
  const signIn = async (email: string, location: string) => {
    // In a real app, you would call your auth provider's magic link method
    // For demo purposes, we'll simulate a successful auth
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mock user for demo
      const mockUser: User = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        email,
        location,
        // Default to individual role for magic link sign in
        role: "individual"
      };
      
      setUser(mockUser);
      localStorage.setItem("ecoGenUser", JSON.stringify(mockUser));
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error signing in:", error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    // In a real app, you would call your auth provider's sign up method
    // For demo purposes, we'll simulate a successful registration
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mock user for demo
      const mockUser: User = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        email,
        ...userData
      };
      
      // In a real app, we wouldn't set the user here yet since they need to verify email
      // For demo, we'll just log the user registration
      console.log("User registered:", mockUser);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error signing up:", error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true);
      // Clear local storage
      localStorage.removeItem("ecoGenUser");
      // Clear user state
      setUser(null);
      return Promise.resolve();
    } catch (error) {
      console.error("Error signing out:", error);
      return Promise.reject(error);
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
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
