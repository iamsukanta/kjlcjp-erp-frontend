import { getUserPermissions } from "../store/authStore";

export const hasPermission = (perm: string): boolean => {
  return getUserPermissions().includes(perm);
};

export const getUserPermissionsFromRoles = async (roles: any) => {
  let permissions:string[] = [];
  await roles.forEach((role: any) => {
    role.permissions.forEach((permission: any) => {
      permissions.push(permission.name);
    });
  });
  return permissions;
}

