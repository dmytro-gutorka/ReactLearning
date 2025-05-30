import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://fnltyjtnvgxkjnwpwkci.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZubHR5anRudmd4a2pud3B3a2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MDgxNTQsImV4cCI6MjA2NDE4NDE1NH0.B-0dUVF8SIZ6ehHySV_4_JbHt6KbWm0pGOzdqtheM6w"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase;