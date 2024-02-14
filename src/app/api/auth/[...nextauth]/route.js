// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        // You might want to specify the credentials fields depending on your needs
      },
      authorize: async (credentials, req) => {
        // Your custom authentication logic goes here
        // Example: Check credentials against a users database
        // If authentication fails, return null
        // Let's assume the login is successful if credentials are provided
        const { _id, mod, accepted } = credentials;

        // You will need to replace this with actual authentication logic
        if (_id && mod !== undefined && accepted !== undefined) {
          return { _id, mod, accepted };
        } else {
          return null; // Return null if authentication fails
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If user is defined, add user information to the token
      if (user) {
        token._id = user._id;
        token.mod = user.mod;
        token.accepted = user.accepted;
      }
      return token;
    },
    async session({ session, token }) {
      // Create a new user object with the properties you want to include in the session
      session.user = {
        _id: token._id,
        mod: token.mod,
        accepted: token.accepted
      };
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export const nextAuthHandler = NextAuth(authOptions);

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// Export the NextAuth handler for all HTTP methods that your application needs.
export const GET = nextAuthHandler;
export const POST = nextAuthHandler;