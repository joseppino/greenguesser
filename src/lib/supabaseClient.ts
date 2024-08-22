import { PUBLIC_SUPABASE_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient('https://nuyavgdfgnfsizjcvrds.supabase.co', PUBLIC_SUPABASE_KEY);