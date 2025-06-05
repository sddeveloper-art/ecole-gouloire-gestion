
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ybafrqbmayanwsfhgrvf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYWZycWJtYXlhbndzZmhncnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNjAxMTksImV4cCI6MjA2NDYzNjExOX0.KZdvbG8NW9CMKldcv_pK7-tICLScnbcixh0k0efeCNY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
