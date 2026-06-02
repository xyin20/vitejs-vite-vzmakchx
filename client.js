import { createClient } from '@supabase/supabase-js'

const URL = 'https://invieufgokbnuwidvjsw.supabase.co'
const API_KEY = 'sb_publishable_zFCygug6yr20L8EjkrgcDQ_hq8PBB5S'

export const supabase = createClient(URL, API_KEY)