"use server";

import UserService from "@/services/UserService.ts";


export const fetchRoles = async () => {
  const userService = new UserService();

  const result = await userService.getRoles();
  console.log({ result });
  return result;
};


