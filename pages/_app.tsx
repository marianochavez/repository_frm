import "../styles/globals.css";

import type { AppProps } from "next/app";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "../context/auth/AuthProvider";
import { msalConfig } from "../utils/authConfig";
import { UIProvider } from "../context/ui/UIProvider";

export default function App({ Component, pageProps }: AppProps) {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <ChakraProvider>
          <UIProvider>
            <Component {...pageProps} />
          </UIProvider>
        </ChakraProvider>
      </AuthProvider>
    </MsalProvider>
  );
}
