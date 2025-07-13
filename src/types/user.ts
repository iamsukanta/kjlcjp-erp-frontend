
export interface Permission {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
  permission_ids?: [number]
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  profile_image?: string;
  file?: File | null;
  roles: Role[];
  role_ids?: [number]
}
