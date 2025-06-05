

import { createClient } from '@supabase/supabase-js';

// For Lovable integration, these will be automatically provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// If running in development without env vars, provide fallback
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Please ensure Supabase integration is properly configured.');
  
  // Create a mock client for development
  export const supabase = createClient(
    'https://placeholder.supabase.co',
    'placeholder-key',
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
} else {
  export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

