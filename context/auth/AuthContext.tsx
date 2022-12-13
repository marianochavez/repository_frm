import { Session } from "next-auth";
import { createContext } from "react";

interface ContextProps {
  session: Session | null;
  isAuthenticated: boolean;

  // methods
  signInUser: () => void;
  signOutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps);
