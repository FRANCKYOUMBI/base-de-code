"use server";

import { UserFormData } from "@/services/types/user";
import UserService  from "@/services/UserService";

export const editUser = async (data: UserFormData, uuid: string) => {
  const userService = new UserService();
  const response = await userService.updateUser(uuid, data);
  return response;
};

export const getUserById = async (uuid: string) => {
  const userService = new UserService();
  return await userService.getUserById(uuid);
};
