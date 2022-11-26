import { AccountInfo } from "@azure/msal-browser";
import { createContext } from "react";

interface ContextProps {
    accounts: AccountInfo[];
    accessToken: string;

    // methods
    signIn: () => void;
    signOut: () => void;
}

export const AuthContext = createContext({} as ContextProps);
