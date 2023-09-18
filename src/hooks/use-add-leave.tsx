import { useMutation } from '@tanstack/react-query';

import { addLeave } from '../services/leaves';

export const useAddLeave = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: addLeave,
  });

  return {
    addLeave: mutate,
    addLeaveLoading: isLoading,
  };
};
