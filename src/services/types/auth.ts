import { User } from '@/services/types/user';
export interface LoginParam {
    email: string;
    password: string;
}

export interface RegisterParam {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserAuthentification {
    token: string;
    user: User;
}

export interface UserRegisterSuccess {
    message: string;
}

export interface EmailValidateSuccess {
    message: string;
}

export interface PasswordRecoveryParam {
    email: string;
}
export interface PasswordRecoverySuccess {

}
export interface ResetPasswordParam {
    token: string;
    new_password: string;
}
export interface ResetPasswordSuccess {

}

export interface UpdateUserProfileFormInput {
    firstName: string;
    lastName: string;
    avatarUuid?: {
        uuid?: string;
        file_name?: string;
        size?: number;
        url?: string;
    }[];
}

export interface UpdateUserProfile{
    firstName: string;
    lastName: string;
    avatarUuid?:string
}

export interface UpdatePasswordInput{
    currentPassword: string;
    password: string;
    
}
