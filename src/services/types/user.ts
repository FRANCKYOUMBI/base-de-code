export interface RoleType{
    uuid: string,
    name: string,
    description: string,
    
}

export interface RolesResponse {
    roles: string[];
    totalCount: number;
  }


export interface Avatar  {
    uuid?: string;
    url?: string;
    file_name?: string;
    size?: number;
}

export interface Role{
    uuid?: string;
    value: string;
    label: string;
}

// Interface principale User
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string|null;
  activated: boolean;
  enabled?: boolean;
  role: {
      uuid?: string;
      value: string;
      label: string;
  };
  avatar?:Avatar[] 
}

export interface UserList {
  uuid: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  activated: boolean;
  createdAt?: string;
  updatedAt?: string;
  role:  string;
  avatar?: Avatar;
}


// Type pour les entrées du formulaire
export interface UserFormInput {
    firstName: string;
    lastName: string;
    email: string;
    password?: string|null;
    activated: boolean;
    enabled?: boolean;
    role: {
        uuid?: string;
        value: string;
        label: string;
    };
    avatar?:Avatar[] 
}
export interface UserFormData {
    uuid?: string;
    firstName: string;
    lastName: string;
    password?: string|null;
    email: string;
    role?:string;
    activated: boolean;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
    enabled?: boolean;
    
}

export interface CreateUserFormInput extends UserFormData {

}

export interface userData {
user:User
status?:number
}

export interface GetAllUsersResponse {
    data: User[];
    totalCount: number;
  }


  export interface GetAllUsersParams {
    skip?: number;
    take?: number;
    createdAt?: "ASC" | "DESC";
    keyword?: string;
    sortBy?: {
      role?: "ASC" | "DESC";
      email?: "ASC" | "DESC";
      firstName?: "ASC" | "DESC";
      lastName?: "ASC" | "DESC";
    };
  }



  export interface UpdateUserFormInput {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    activated: boolean;
  }









