import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getDepartments } from '../services/departments';

export const useDepartments = () => {
  const { data } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
  });

  return useMemo(
    () =>
      data?.map(({ id, name }) => ({
        value: id.toString(),
        label: name,
      })),
    [data]
  );
};
