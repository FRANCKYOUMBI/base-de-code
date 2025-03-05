"use server";

import { FetchDataOptions } from "@/hooks/use-table-async.ts";
import UserService  from "@/services/UserService.ts";
import {  UserFormData } from "@/services/types/user";
// import Fetch from "ahooks/lib/useRequest/src/Fetch";

export const fetchUsers = async ({
  skip,
  take,
  keyword,
  sortBy,
}: FetchDataOptions) => {
  const userService = new UserService();

 return await userService.getAllUsers({ skip, take, keyword, sortBy });
 
};

export const editUser = async (data: UserFormData, uuid: string) => {
  const userService = new UserService();
  return await userService.updateUser(uuid, data);

};

export const getUserById = async (uuid: string) => {
  const userService = new UserService();
  return await userService.getUserById(uuid);
};

export const deleteUser = async (uuid: string) => {
  const userService = new UserService();
  return await userService.deleteUser(uuid);
};

export const getTheCurrentUser = async () => {
  const userService = new UserService();
  return await userService.getCurrentUser();
};
