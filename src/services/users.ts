import { compare, hash } from "bcrypt";
import prisma from "./prisma";
import { Role, UserStatus } from "@prisma/client";
import { PasswordForm, UserType } from "@/types/Datatype";


interface UserCreate {
    email: string
    phoneNumber: string
    password: string
    status: UserStatus,
    firstName: string | null | undefined
    lastName: string | null | undefined
    hotelName: string | null | undefined
}

export async function getUserByEmail(email: string) {
    try {
        const userExists = await prisma.user.findFirst({
            where: {
                status: {
                    not: 'DELETE'
                },
                AND: [
                    { email },
                ]
            }
        });
        return userExists;
    } catch (error: any) {
        console.log({ error });
        return null;
    }
}

export async function getUserByUuid(uuid: string) {
    try {
        const userExists = await prisma.user.findFirst({
            where: {
                status: {
                    not: 'DELETE'
                },
                AND: [
                    { uuid },
                ]
            },
            include: {
                missionsAccepted: {
                    include: {
                        hotel: {
                            select: {
                                hotelName: true,
                                email: true,
                                uuid: true,
                                phoneNumber: true,
                                address: true,
                                identifiant: true,
                                createdAt: true,
                                updatedAt: true,
                            }

                        },
                    }
                },
            }
        });
        // @ts-ignore
        const { password, ...user } = userExists;
        return user;
    } catch (error: any) {
        console.log({ error });
        return null;
    }
}

export async function createUser(data: UserCreate, role: Role) {
    try {
        // check if user with email exists
        const userExists = await getUserByEmail(data.email);
        if (userExists) {
            return { error: "Un utilisateur avec cet email existe déjà" }
        }
        const password = await hash(data.password, 12);
        const user = await prisma.user.create({
            data: {
                email: data.email,
                phoneNumber: data.phoneNumber,
                password,
                firstName: data.firstName ?? null,
                lastName: data.lastName ?? null,
                hotelName: data.hotelName ?? null,
                status: data.status,
                role,
            }
        });
        return { user };
    } catch (error: any) {
        console.log({ error });
        return { error: error.message }
    }
}

export async function updateUser(uuid: string, data: any) {
    try {
        const user = await prisma.user.update({
            where: {
                uuid
            },
            data
        });
        return { user };
    } catch (error: any) {
        console.log({ error });
        return { error: error.message }
    }
}

export async function changePassword(data: PasswordForm) {
    try {
        const userByEmail = await getUserByEmail(data.email);
        if (userByEmail) {
            const passwordCorrect = await compare(data.oldPassword, userByEmail.password!);
            if (passwordCorrect) {
                const passwordHashed = await hash(data.newPassword, 12);
                const user = await prisma.user.update({
                    where: {
                        uuid: userByEmail.uuid,
                    },
                    data: {
                        password: passwordHashed
                    }
                });
                return { success: "Mot de pass modifié avec succès" }
            } else {
                return { badPassword: "Mot de passe actuel fourni non correct" }
            }
        } else {
            return { notExist: "Utilisateur introuvable" }
        }
    } catch (error: any) {
        return { error: error.message };
    }
}

// get user by role extra = EXTRA
export async function getUsersByRole(role: Role) {
    try {
        const users = await prisma.user.findMany({
            where: {
                status: {
                    not: 'DELETE'
                },
                role
            },
            include: {
                extraBankInfo: true,
                avatar: true,
                skills: {
                    include: {
                        skill: true
                    }
                },
                softwares: {
                    include: {
                        software: true
                    }
                },
                documents: {
                    include: {
                        file: true
                    }
                },
                missionsAccepted: {
                    include: {
                        hotel: {
                            select: {
                                hotelName: true,
                                email: true,
                                uuid: true,
                                phoneNumber: true,
                                address: true,
                                identifiant: true,
                                createdAt: true,
                                updatedAt: true,
                            }
                        },
                    }
                },
                missionsCreated: {
                    include: {
                        acceptedBy: {
                            select: {
                                firstName: true,
                                lastName: true,
                                email: true,
                                uuid: true,
                                phoneNumber: true,
                                address: true,
                                identifiant: true,
                                createdAt: true,
                                updatedAt: true,
                                avatar: true
                            }
                        },
                    }
                },
            }
        });
        return users.map((user) => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword as unknown as UserType;
        });
    } catch (error: any) {
        return null;
    }
}