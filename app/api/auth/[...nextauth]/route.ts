import NextAuth, { DefaultUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/mongodb';

interface User extends DefaultUser {
  id: string;
  staffId: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

async function findUser(credentials: { staffId: string }): Promise<User | null> {
  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ staffId: credentials.staffId });
    return user as User | null;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        staffId: { label: "Staff ID", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        try {
          if (!credentials?.staffId || !credentials?.password) {
            throw new Error('Please enter your staff ID and password');
          }

          const user = await findUser(credentials);

          if (!user) {
            throw new Error('No user found with this staff ID');
          }

          // Simple password check (you might want to implement a more secure method later)
          const isPasswordValid = credentials.password === user.password;

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user.id,
            staffId: user.staffId,
            name: user.name,
            email: user.email,
            role: user.role,
            password: user.password
          };
        } catch (error) {
          console.error('Authorization error:', error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as User).role;
        token.staffId = (user as User).staffId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).staffId = token.staffId;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

// The user's currentStage will be available in the session 