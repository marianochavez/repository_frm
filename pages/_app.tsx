import "../styles/globals.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthProvider } from "../context/auth/AuthProvider";
import { UIProvider } from "../context/ui/UIProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <AuthProvider>
        <ChakraProvider>
          <UIProvider>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools />
              <Component {...pageProps} />
            </QueryClientProvider>
          </UIProvider>
        </ChakraProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
