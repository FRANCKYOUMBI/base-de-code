import BaseService from "@/services/BaseService";
import {
    LoginParam,
    RegisterParam,
    UserAuthentification,
    UserRegisterSuccess,
    PasswordRecoveryParam,
    PasswordRecoverySuccess,
    ResetPasswordParam,
    ResetPasswordSuccess,
    UpdateUserProfile,
} from "@/services/types/auth";
import {ServerMessage} from "@/services/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/[lang]/api/auth/[...nextauth]/auth-options";
import { User } from "./types/user";

export default class AuthService extends BaseService {
    constructor() {
        super({ path_api: "/auths" });

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.resendCode = this.resendCode.bind(this);
        this.passwordRecovery = this.passwordRecovery.bind(this)

        this.resetPassword = this.resetPassword.bind(this)
        this.updateUserProfile = this.updateUserProfile.bind(this)  
        this.getCurrentUser = this.getCurrentUser.bind(this); 
        this.updatePassword = this.updatePassword.bind(this); 
    }

    async login(body: LoginParam): Promise<UserAuthentification | ServerMessage> 
    {
        const response = await fetch(`${this.BASE_API_URL}/login`, {
            ...super.buildHeader({ method: "POST", body }),
            
        });
        console.log("URL de connexion :", `${this.BASE_API_URL}/login`),
        console.log("Corps de la requête :", body)

        if([200, 201].includes(response.status)){
            return (await response.json()) as UserAuthentification;
            
        }
        console.log("Statut de la réponse :", response.status);
        
        const errorData = await response.json();
        console.log("Données d'erreur :", errorData);
        return errorData as ServerMessage;
    }

    public async register(body: RegisterParam): Promise<UserRegisterSuccess> {
        const response = await fetch(`${this.BASE_API_URL}/register/start`, {
            ...super.buildHeader({ method: "POST", body }),
        });

        if (response.ok) {
            return await response.json();
        }

        return {
            message: (await response.json())['message']
        };
        
    }

    async resendCode(body: { token: string }): Promise<UserAuthentification | ServerMessage> {
        const response = await fetch(
            `${this.BASE_API_URL}/register/resend-validation-code`,
            {
                ...super.buildHeader({ method: "POST", body }),
            }
        );

        if (response.ok) {
            return await response.json();
        }

        return {
            statusCode: response.status,
            message: (await response.json())['message'],
        };
    }


    async passwordRecovery({ email }: PasswordRecoveryParam): Promise<PasswordRecoverySuccess> {
        const response = await fetch(`${this.BASE_API_URL}/password-recovery/${email}`, {
            ...super.buildHeader({ method: "POST" }),
        });

        return await response.json();
    }

    async resetPassword(body: ResetPasswordParam): Promise<ResetPasswordSuccess> {
        const response = await fetch(`${this.BASE_API_URL}/reset-password/`, {
            ...super.buildHeader({ method: "POST", body }),
        })
        return await response.json();
    }

    async updateUserProfile(body: UpdateUserProfile): Promise<UserAuthentification | ServerMessage> {
        //@ts-ignore
        const { user } = await getServerSession(authOptions);

        const response = await fetch(`${this.BASE_API_URL}/me`, {
            ...super.buildHeader({ method: "PUT", body, token: user.accessToken }),
        });

        if ([200, 201].includes(response.status)) {
            return (await response.json()) as UserAuthentification;
        }

        const errorData = await response.json();
        console.log("Données d'erreur :", errorData);
        return errorData as ServerMessage;
    }


    async getCurrentUser(): Promise<User | ServerMessage> {
        //@ts-ignore
        const { user } = await getServerSession(authOptions);
        const response = await fetch(`${this.BASE_API_URL}/me`, {
            ...super.buildHeader({ method: "GET", token: user.accessToken }),
        });

        if (response.ok) {
            return (await response.json()) as User;
        }

        const errorData = await response.json();
        console.log("Données d'erreur :", errorData);
        return errorData as ServerMessage;
    }

    async updatePassword(body: { currentPassword: string; password: string }): Promise<ServerMessage > {
        //@ts-ignore
        const { user } = await getServerSession(authOptions);
    
        const response = await fetch(`${this.BASE_API_URL}/me/password`, {
            ...super.buildHeader({
                method: "PUT",
                body,
                token: user.accessToken,
            }),
        });       
            return (await response.json()) as ServerMessage;
    }
    
}
