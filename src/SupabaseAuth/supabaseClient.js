// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import { ANNON_TOKEN, SUPABASE_URL } from './creds';

const supabase = createClient(SUPABASE_URL, ANNON_TOKEN);

export default supabase;
