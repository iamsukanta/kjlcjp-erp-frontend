import { getUserPermissions } from "../store/authStore";

export const hasPermission = (perm: string): boolean => {
  return getUserPermissions().includes(perm);
};


