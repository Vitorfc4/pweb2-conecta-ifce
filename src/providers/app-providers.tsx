import { useEffect, type PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';
import { setUnauthorizedHandler } from '@/lib/api-client';
import { useAuthStore } from '@/features/auth/auth.store';

function ApiSessionBridge() {
  useEffect(() => {
    setUnauthorizedHandler(() => {
      useAuthStore.getState().logout();
      window.location.assign('/login');
    });

    return () => setUnauthorizedHandler(null);
  }, []);

  return null;
}

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        keepPreviousData: true,
      }}
    >
      <ApiSessionBridge />
      {children}
    </SWRConfig>
  );
}
