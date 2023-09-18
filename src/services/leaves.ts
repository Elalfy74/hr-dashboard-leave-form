import { supabase } from './supabase';

import { LeaveFormState } from '../components/leave-form-schema';

export async function addLeave(input: LeaveFormState) {
  const { data, error } = await supabase.from('leaves').insert({
    ...input,
    department_id: +input.department_id,
    leave_type_days: input.leave_type === 'Days',
    selected_day: input.selected_day?.toLocaleDateString(),
    start_hour: input.start_hour?.toLocaleTimeString(),
    end_hour: input.end_hour?.toLocaleTimeString(),
    start_date: input.start_date?.toLocaleDateString(),
    end_date: input.end_date?.toLocaleDateString(),
  });

  if (error) throw new Error(error.message);

  return data;
}
