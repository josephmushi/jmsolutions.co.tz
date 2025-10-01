import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (user) => {
    if (user) {
      const { data, error } = await supabase
        .from('JMUsers')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, which is okay initially.
        console.error('Error fetching profile:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch user profile.",
        });
        setProfile(null);
      } else {
        setProfile(data);
      }
    } else {
      setProfile(null);
    }
  }, [toast]);

  const handleSession = useCallback(async (currentSession) => {
    setSession(currentSession);
    const currentUser = currentSession?.user ?? null;
    setUser(currentUser);
    if (currentUser) {
      await fetchProfile(currentUser);
    } else {
      setProfile(null);
    }
    setLoading(false);
  }, [fetchProfile]);

  useEffect(() => {
    setLoading(true);
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      handleSession(session);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        handleSession(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [handleSession]);

  const signUp = useCallback(async (email, password, options) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign up Failed",
        description: error.message || "Something went wrong",
      });
      return { data, error };
    } 
    
    if (data.user) {
      const userProfile = {
        id: data.user.id,
        ...options.data
      };
      // The email is already in auth.users, so we don't need to pass it here if it's in options.data
      if (!userProfile.email) {
        userProfile.email = data.user.email;
      }

      const { error: profileError } = await supabase.from('JMUsers').insert([userProfile]);
      
      if (profileError) {
        toast({
          variant: "destructive",
          title: "Profile Creation Failed",
          description: profileError.message || "Could not save user profile.",
        });
        
        // Attempt to clean up the created auth user if profile creation fails
        await supabase.auth.admin.deleteUser(data.user.id);

        return { data: null, error: profileError };
      }
    }

    return { data, error };
  }, [toast]);

  const signIn = useCallback(async (identifier, password) => {
    // Basic check to see if it's an email or not.
    const isEmail = identifier.includes('@');
    
    const credentials = isEmail 
      ? { email: identifier, password }
      : { phone: identifier, password };

    const { error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in Failed",
        description: error.message || "Invalid credentials",
      });
    }

    return { error };
  }, [toast]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      });
    } else {
      setUser(null);
      setProfile(null);
      setSession(null);
    }
    return { error };
  }, [toast]);

  const value = useMemo(() => ({
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    fetchProfile,
  }), [user, session, profile, loading, signUp, signIn, signOut, fetchProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};