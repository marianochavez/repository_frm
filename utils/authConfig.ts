import { MsalConfig } from "../interfaces/azure";

export const msalConfig: MsalConfig = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_AZURE_APP_CLIENT || "",
        authority: process.env.NEXT_PUBLIC_AZURE_APP_AUTHORITY || "",
        redirectUri: process.env.NEXT_PUBLIC_AZURE_REDIRECT_URL || "",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
}

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};