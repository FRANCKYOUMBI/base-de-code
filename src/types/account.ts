export interface User {
    uuid: string
    email: string
    phoneNumber: string
    password: string
    firstName: string | null
    lastName: string | null
    hotelName: string | null
    address: string | null
    identifiant: string | null
    role: Role
    status: UserStatus
    avatar: Avatar
    avatarId: string | null
    createdAt: Date
    updatedAt: Date
}

export interface Avatar {
    url?: string,
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPEND = 'SUSPEND',
    DELETE = 'DELETE'
};

export enum Role {
    ADMIN = 'ADMIN',
    HOTEL = 'HOTEL',
    EXTRA = 'EXTRA'
}
;
