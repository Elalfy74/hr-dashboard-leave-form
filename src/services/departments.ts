import { supabase } from './supabase';

export async function getDepartments() {
  const { data, error } = await supabase.from('departments').select();

  if (error) throw new Error(error.message);

  return data;
}
