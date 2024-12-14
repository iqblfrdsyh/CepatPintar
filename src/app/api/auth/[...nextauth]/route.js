import { checkLastStudy } from "@/libs/check";
import { loginWithGoogle } from "@/libs/firebase/service";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        const data = {
          fullname: profile.name || "",
          name: profile.given_name || "",
          email: profile.email || "",
          image: profile.picture || "",
          last_study: new Date(),
          activity_points: 0,
          login_type: "google",
        };

        await loginWithGoogle(data, (result) => {
          if (result.status) {
            token.id = result.data.id;
            token.fullname = result.data.fullname;
            token.name = result.data.name;
            token.email = result.data.email;
            token.image = result.data.image;
            token.last_study = result.data.last_study;
            token.activity_points = result.data.activity_points;
            token.login_type = result.data.login_type;
          }
        });
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        fullname: token.fullname,
        name: token.name,
        email: token.email,
        image: token.image,
        last_study: token.last_study,
        activity_points: token.activity_points,
        login_type: token.login_type,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
