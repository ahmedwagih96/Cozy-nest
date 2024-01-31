"use client";
import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { usePathname, useSearchParams } from "next/navigation";
import * as NProgress from "nprogress";

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function Providers({ children }: ProvidersProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathName, searchParams]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Providers;
