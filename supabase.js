import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://lsrnigqdwetdxqsnaabs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzcm5pZ3Fkd2V0ZHhxc25hYWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNzYxNTYsImV4cCI6MjA5Njg1MjE1Nn0.Zot1CZU3UmYO_P8DQIGtHqBEJmZnL8Yvm1hVLkqbuCo";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);