// src/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if there's an active session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    // Listen for changes in auth state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Sign-Up function
  const signUp = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Error during sign-up:', error.message);
    } else {
      console.log('Sign-up successful:', data.user);
      setUser(data.user);
    }
  };

  // Sign-In function
  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Error during sign-in:', error.message);
    } else {
      console.log('Sign-in successful:', data.user);
      setUser(data.user);
    }
  };

  // Sign-Out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error during sign-out:', error.message);
    } else {
      console.log('Sign-out successful');
      setUser(null);
    }
  };

  const value = {
    user,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
