"use server";

import { CreateUserFormInput } from "@/services/types/user";
import UserService from "@/services/UserService";

export const createUser = async (data: CreateUserFormInput) => {
        const userService = new UserService();
    const response = await userService.createUser(data);
    return response;
    
};
