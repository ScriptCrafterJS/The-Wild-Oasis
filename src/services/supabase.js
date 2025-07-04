import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://lnnisvdtfnhnfqvfaahn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxubmlzdmR0Zm5obmZxdmZhYWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4NjU3NjAsImV4cCI6MjA0MjQ0MTc2MH0.a068E2wne62JzENK2VrZEP_yn6qYvRNAAhdiiG6U0sA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
