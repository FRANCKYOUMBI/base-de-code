import { authOptions } from "@/app/[lang]/api/auth/[...nextauth]/auth-options";
import BaseService from "@/services/BaseService";
import { ServerMessage } from "@/services/types";
import { getServerSession } from "next-auth/next";
import { GetAllUsersParams, GetAllUsersResponse, RolesResponse, User, userData, UserFormData, UserList } from "./types/user";

// Définissez ici les types nécessaires pour les utilisateurs

export default class UserService extends BaseService {
  constructor() {
    super({ path_api: "" });

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getRoles = this.getRoles.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async getCurrentUser(): Promise<UserList | ServerMessage> {
    // @ts-ignore
    const { user } = await getServerSession(authOptions);
    const response = await fetch(`${this.BASE_API_URL}/auths/me`, {
      ...super.buildHeader({ token: user.accessToken }),
    });
    if (response.ok) {
      return (await response.json()) as UserList;
    }
    return (await response.json()) as ServerMessage;
  }

  async updateUser(
    userId: string,
    body: UserFormData
  ): Promise<UserList | ServerMessage> {
    // @ts-ignore
    const { user } = await getServerSession(authOptions);
    const response = await fetch(`${this.BASE_API_URL}/users/${userId}`, {
      ...super.buildHeader({ token: user.accessToken, method: "PUT" }),
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return (await response.json()) as UserList;
    }
    return (await response.json()) as ServerMessage;
  }

  async deleteUser(userId: string): Promise<ServerMessage> {
    // @ts-ignore
    const { user } = await getServerSession(authOptions);
    const response = await fetch(`${this.BASE_API_URL}/users/${userId}`, {
      ...super.buildHeader({ token: user.accessToken, method: "DELETE" }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    // Le serveur renvoie 204 pour une suppression réussie
    if (response.status === 204) {
      return { message: "User deleted successfully" } as ServerMessage;
    }

    throw new Error("Unexpected response from server");
  }

  async getUserById(userId: string): Promise<userData | ServerMessage> {
    // @ts-ignore
    const { user } = await getServerSession(authOptions);

    const response = await fetch(`${this.BASE_API_URL}/users/${userId}`, {
      ...super.buildHeader({ token: user.accessToken }),
    });

    if (response.ok) {
      return (await response.json()) as userData;
    }

    return (await response.json()) as ServerMessage;
  }

  async getAllUsers(
    params: GetAllUsersParams = {}
  ): Promise<GetAllUsersResponse | ServerMessage> {
    // @ts-ignore
    const { user } = await getServerSession(authOptions);
    const queryParams = new URLSearchParams();
    if (params.skip !== undefined)
      queryParams.append("skip", params.skip.toString());
    if (params.take !== undefined)
      queryParams.append("take", params.take.toString());
    if (params.createdAt) queryParams.append("createdAt", params.createdAt);
    if (params.keyword) queryParams.append("keyword", params.keyword);
    if (params.sortBy) {
      Object.entries(params.sortBy).forEach(([key, value]) => {
        if (value) queryParams.append(`sortBy.${key}`, value);
      });
    }

    const response = await fetch(
      `${this.BASE_API_URL}/users?${queryParams.toString()}`,
      {
        ...super.buildHeader({ token: user.accessToken }),
      }
    );

    if ([200, 201].includes(response.status)) {
      return (await response.json()) as GetAllUsersResponse;
    }
    return (await response.json()) as ServerMessage;
  }



  async getRoles(): Promise<RolesResponse | ServerMessage> {
    // @ts-ignore
    const { user } = await getServerSession(authOptions);

    const response = await fetch(`${this.BASE_API_URL}/users/roles`, {
      ...super.buildHeader({ token: user.accessToken }),
    });

    if ([200, 201].includes(response.status)) {
      return (await response.json()) as RolesResponse;
    }
    return (await response.json()) as ServerMessage;
  }




  async createUser(params: UserFormData): Promise<UserFormData | ServerMessage> {
    // @ts-ignore
    const { user } = await getServerSession(authOptions);
    const response = await fetch(`${this.BASE_API_URL}/users`, {
      ...super.buildHeader({ token: user.accessToken }),
      method: "POST",
      body: JSON.stringify(params),
    });

    if ([200, 201, 204].includes(response.status)) {
      return await response.json() as UserFormData;
    }
    return await response.json() as ServerMessage;
  }
}
