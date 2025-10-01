import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zkqaklxygxrofnherqqw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprcWFrbHh5Z3hyb2ZuaGVycXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjUyMTYsImV4cCI6MjA3MzQ0MTIxNn0.X1cncFohU6okpcjv_dxfPYyC_wUKSj0PrWtGfhndaEw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);