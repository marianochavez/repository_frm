import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import { dbUsers } from "../../../database"

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    maxAge: 86400, // 1 day
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as any;
      (session as any).accessToken = token.accessToken;

      return session;
    },
    async jwt({ token, user, account }) {

      if (account?.type === "oauth") {
        token.user = await dbUsers.oauthToDBUser(user?.email || "", user?.name || "");
        token.accessToken = account.access_token;
      }

      return token;
    }
  }
})
