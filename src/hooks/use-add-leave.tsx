import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

import { addLeave } from '../services/leaves';

export const useAddLeave = () => {
  const { mutate, isLoading, error } = useMutation({
    mutationFn: addLeave,
    onSuccess: () => {
      notifications.show({
        title: 'Your Form has been submitted!',
        message: '',
      });
    },
  });

  return {
    addLeave: mutate,
    addLeaveLoading: isLoading,
    addLeaveError: error instanceof Error && error.message,
  };
};
