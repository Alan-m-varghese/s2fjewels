import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@s2fjewels.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required.');
        }

        const email = credentials.email.toLowerCase().trim();

        // Dev Mode Fallback for instant Admin & Customer Login
        if (email === 'admin@s2fjewels.com' && credentials.password === 'admin123456') {
          return {
            id: 'admin-dev-id',
            name: 'S2F Admin',
            email: 'admin@s2fjewels.com',
            role: 'ADMIN' as any,
            phone: '+919876543210',
          };
        }

        if (email === 'customer@example.com' && credentials.password === 'customer123') {
          return {
            id: 'customer-dev-id',
            name: 'Riya Sharma',
            email: 'customer@example.com',
            role: 'CUSTOMER' as any,
            phone: '+919876543211',
          };
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (user && user.passwordHash) {
            const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);
            if (isPasswordValid) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
              };
            }
          }
        } catch (dbErr) {
          console.warn('Prisma auth lookup fallback:', dbErr);
        }

        throw new Error('Invalid email or password.');
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback_secret_for_dev_mode_only_123',
};
