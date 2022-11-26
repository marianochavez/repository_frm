import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";

import { loginRequest } from "../../utils/authConfig";
import { AuthContext } from "./AuthContext";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const { instance: msalInstance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (accounts.length === 0) return;
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    msalInstance
      .acquireTokenSilent(request)
      .then((res) => setAccessToken(res.accessToken))
      .catch((e) =>
        msalInstance
          .acquireTokenPopup(request)
          .then((res) => setAccessToken(res.accessToken))
      );
  }, [accounts, msalInstance]);

  async function signIn() {
    try {
      await msalInstance.loginRedirect(loginRequest);
    } catch (error) {
      console.log(error);
    }
  }

  async function signOut() {
    try {
      msalInstance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        accounts,
        accessToken,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
