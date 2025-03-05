import { getUserByEmail } from "@/services/users";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 12 * 30 * 24 * 60 * 60, // 12 months
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" },
            },

            // @ts-ignore
            async authorize(credentials?,) {
                // Handle Auth
                if (!credentials?.email || !credentials?.password) return null;
                const user = await getUserByEmail(credentials.email);
                if (!user || user.status !== "ACTIVE") return null;
                // check if password is correct with bcrypt
                const isPasswordCorrect = compare(credentials.password, user.password);
                if (!isPasswordCorrect) return null;

                return {
                    "id": user.uuid,
                    "address": user.address,
                    "name": user.role === "HOTEL" ? user.hotelName : (user.firstName + " " + user.lastName),
                    "email": user.email,
                    "image": "https://gravatar.com/avatar/abc123?s=256",
                    "role": user.role,
                    "hotelName": user.hotelName,
                    "phoneNumber": user.phoneNumber,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "identifiant": user.identifiant,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            /* Step 1: update the token based on the user object */
            if (user) {
                token.id = user.id;
                token.address = user.address;
                token.role = user.role;
                token.hotelName = user.hotelName;
                token.phoneNumber = user.phoneNumber;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.identifiant = user.identifiant;
            }
            return token;
        },
        session({ session, token }) {
            /* Step 2: update the session.user based on the token object */
            if (token && session.user) {
                session.user.id = token.id;
                session.user.address = token.address;
                session.user.role = token.role;
                session.user.hotelName = token.hotelName;
                session.user.phoneNumber = token.phoneNumber;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.identifiant = token.identifiant;
            }
            return session;
        },
    },
    pages: {
        signIn: '/connexion'
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };