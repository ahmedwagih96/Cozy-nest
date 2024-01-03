"use client";
import { AppContextProvider } from "@/contexts/AppContext";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

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
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>{children}</AppContextProvider>
    </QueryClientProvider>
  );
}

export default Providers;
