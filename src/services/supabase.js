import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://syefjarbtogidwdgguxb.supabase.co'
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZWZqYXJidG9naWR3ZGdndXhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3NTg1NzEsImV4cCI6MjAyMjMzNDU3MX0.0FzC3Fz5bLN0AiZJhlZcgao0C9I2dIIZyc2MumZixOc"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;