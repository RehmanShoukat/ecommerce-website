import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yzptfcscjjtpqthnesjm.supabase.co';  
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6cHRmY3Njamp0cHF0aG5lc2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NzY0MDIsImV4cCI6MjA2NTU1MjQwMn0.70R6uidIjLZvFJtWGtT2M0JXxJnEf1Kn9X06w5_XIps';                // ← yahan apna public API key

export const supabase = createClient(supabaseUrl, supabaseKey);
