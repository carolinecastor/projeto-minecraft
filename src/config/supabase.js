import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iwutcntupfcuperwyjuw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3dXRjbnR1cGZjdXBlcnd5anV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MDg4NzMsImV4cCI6MjA3MzI4NDg3M30.G-gKt5hvokBPL7jD3ADTglL7yCeEbpuSJWxAJDy12Vw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})