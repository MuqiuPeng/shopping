import useSWR, { SWRConfiguration } from 'swr';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
    throw error;
  }
  return response.json();
};

const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 5 * 60 * 1000,
  errorRetryCount: 2,
  errorRetryInterval: 1000,
  shouldRetryOnError: true
};

export const useApi = <T = any>(
  url: string | null,
  config?: SWRConfiguration
) => {
  const mergedConfig = { ...defaultConfig, ...config };

  const { data, error, isLoading, mutate, isValidating } = useSWR<T>(
    url,
    fetcher,
    mergedConfig
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    refetch: mutate,
    mutate
  };
};

// 专门用于用户详情的 hook
export const useUserDetail = (
  userId: string | null,
  enabled: boolean = true
) => {
  const url = enabled && userId ? `/api/user/admin/${userId}` : null;

  return useApi(url, {
    revalidateOnMount: true
  });
};
