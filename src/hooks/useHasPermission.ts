import { getUserPermissions } from "../store/authStore";
export const useHasPermission = (perm: string): boolean => {
  return getUserPermissions().includes(perm);
};