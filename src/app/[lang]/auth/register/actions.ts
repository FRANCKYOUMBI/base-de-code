"use server";

import { RegisterParam } from "@/services/types/auth";
import AuthService from "@/services/AuthsService";

export const register = async (data: RegisterParam) => {
    const authService = new AuthService();
    const response = await authService.register(data);
    return response;
};