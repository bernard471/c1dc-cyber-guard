import NextAuth, { DefaultSession } from "next-auth";
import { User } from "@/models/User";
import connectDB from '@/lib/mongodb';
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      reports?: Array<{
        reportId: string;
        createdAt: Date;
        status: string;
      }>;
    } & DefaultSession["user"]
  }
}

const handler = NextAuth({
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
    },
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async signIn({ account, profile }) {
        if (account?.provider === "google") {
          await connectDB();
          
          const userDoc = {
            name: profile?.name,
            email: profile?.email,
            image: profile?.image,
            createdAt: new Date(),
            lastActive: new Date(),
            isGoogleUser: true
          };
  
          const existingUser = await User.findOne({ email: profile?.email });
          
          if (!existingUser) {
            await User.create(userDoc);
          } else {
            await User.findOneAndUpdate(
              { email: profile?.email },
              { lastActive: new Date() }
            );
          }
        }
        return true;
      },
  
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
        }
        return token;
      },
  
      async session({ session, token }) {
        if (token) {
          const userData = await User.findOne({ email: token.email });
          if (userData) {
            session.user = {
              ...session.user,
              id: userData._id?.toString(),
              image: userData.image || session.user.image
            };
          }
        }
        return session;
      },
  
      async redirect({ baseUrl }) {
        // Always redirect to dashboard after successful sign in
        return `${baseUrl}/dashboard`;
      }
    },
    pages: {
      signIn: "/auth/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  
  export { handler as GET, handler as POST };
  
