import { create } from "zustand";
import type { Permission, Role, User } from "../types/user";

interface UserState {
  users: User[] | [];
  roles: Role[] | [],
  permissions: Permission[] | [];
  setUsers: ( users: User[]) => void;
  setRoles: ( roles: Role[]) => void;
  setPermissions: ( permissions: Permission[]) => void;
}

export const useUserStore = create<UserState>()(
    (set) => ({
      users: [],
      roles: [],
      permissions: [],
      setUsers: (users: User[]) => set({ users }),
      setRoles: (roles: Role[]) => set({ roles }),
      setPermissions: (permissions: Permission[]) => set({ permissions })
    })
);

export const getUsersList = () => {
  return useUserStore.getState().users;
};

export const getRolesList = () => {
  return useUserStore.getState().roles;
};

export const getPermissionsList = () => {
  return useUserStore.getState().permissions;
};
