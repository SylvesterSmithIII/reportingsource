// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. 'Credentials')
      name: 'Credentials',
      // The credentials are used to generate a suitable form on the sign-in page.
      // You can override this with a simple HTML form.
      credentials: {},
      // You need to provide a authorize function that returns a user object.
      // If you return null or false then the credentials will be rejected.
      authorize: (credentials) => {
      
       console.log(credentials)

       const { _id, mod, accepted } = credentials

      
       const user = {
          _id,
          mod,
          accepted
       }

       console.log(user)

        return user
       
      }
    })
  ],
  
  // Optionally add more configuration here
  callbacks: {
    async jwt({ token, user }) {
      // If user object is available (sign in), add user data to the token
      if (user) {
        token._id = user._id;
        token.mod = user.mod;
        token.accepted = user.accepted
      }
      return token;
    },
    async session({ session, token }) {
      // Add user data to the session object from the token
      session.user._id = token._id;
      session.user.mod = token.mod;
      session.user.accepted = token.accepted;

      return session;
    },

    
  },

  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}