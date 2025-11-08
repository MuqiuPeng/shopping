import { useApi } from '@/hooks/use-api';

export const useUserDetail = (
  userId: string | null,
  enabled: boolean = true
) => {
  const url = enabled && userId ? `/api/user/admin/${userId}` : null;

  return useApi(url, {
    revalidateOnMount: true
  });
};
