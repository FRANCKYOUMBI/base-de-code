import NextAuth, {DefaultSession, DefaultUser, DefaultJWT} from "next-auth"
import {Role} from "@/services/users";

interface IUser extends DefaultUser {
    uuid?: string;
    phoneNumber: string;
    firstName: string | null;
    lastName: string | null;
    hotelName: string | null;
    identifiant: string | null;
    email: string;
    address: string;
    role: Role;
    id: string;
}

declare module "next-auth" {
    interface User extends IUser {
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends IUser, DefaultJWT {
    }
}