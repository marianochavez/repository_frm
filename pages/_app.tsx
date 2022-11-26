import "../styles/globals.css";

import type { AppProps } from "next/app";

import { AuthProvider } from "../context/auth/AuthProvider";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../utils/authConfig";
import { MsalProvider } from "@azure/msal-react";

export default function App({ Component, pageProps }: AppProps) {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </MsalProvider>
  );
}
