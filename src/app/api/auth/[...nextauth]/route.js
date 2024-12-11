import { loginWithGoogle } from "@/libs/firebase/service";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const data = {
        fullname: profile.name || "",
        email: profile.email || "",
        image: profile.picture || "",
        last_study: "",
        login_type: "google",
      };

      try {
        const result = await loginWithGoogle(data);

        if (result) {
          console.log("User saved successfully:", result);
          return true;
        } else {
          console.error("Failed to save user data");
          return false;
        }
      } catch (error) {
        console.error("Error during signin:", error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
