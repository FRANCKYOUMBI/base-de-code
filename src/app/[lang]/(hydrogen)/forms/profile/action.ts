"use server";

import AuthsService from "@/services/AuthsService";
import { UpdateUserProfile } from "@/services/types/auth";

export const updateProfile = async (data: UpdateUserProfile) => {
        const authsService = new AuthsService();
    const response = await authsService.updateUserProfile(data);
    return response;
    
};

export const getProfile = async () => {
    const authsService = new AuthsService();
    const response = await authsService.getCurrentUser();
    return response;
    
}

export const updatePassword = async (data: { currentPassword: string; password: string }) => {
    const authsService = new AuthsService();
    const response = await authsService.updatePassword(data);
    return response;
    
}
