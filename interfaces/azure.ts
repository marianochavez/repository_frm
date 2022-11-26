export type MsalConfig = {
    auth: {
        clientId: string;
        authority: string;
        redirectUri: string;
    };
    cache: {
        cacheLocation: string;
        storeAuthStateInCookie: boolean;
    };
    system?: {
        loggerOptions: {
            loggerCallback: (level: any, message: any, containsPii: any) => void;
        };
    };
}