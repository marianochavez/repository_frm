import { signIn, signOut, useSession } from "next-auth/react";

import { AuthContext } from "./AuthContext";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  // TODO: check what other components use this session
  const {data:session, status} = useSession();
  const isAuthenticated = !!(status === "authenticated");

  async function signInUser () {
    try {
      await signIn("azure-ad");
    } catch (error) {
      console.log(error);
    }
  }

  async function signOutUser() {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated,
        signInUser,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
