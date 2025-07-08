import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  credentials: { access_token: string, refresh_token: string, type: string } | null;
  user: { id: string; name: string; email: string } | null;
  permissions: string[];
  login: (credentials: AuthState["credentials"], user: AuthState["user"]) => void;
  logout: () => void;
  setPermissions: (permissions: AuthState['permissions']) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      credentials: null,
      user: null,
      permissions: [],
      login: (credentials, user) => set({ credentials, user }),
      logout: () => set({ credentials: null, user: null, permissions: [] }),
      setPermissions: (permissions) => set({ permissions })
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);

export const getAuthToken = () => {
  return useAuthStore.getState().credentials?.access_token;
};

export const getRefreshToken = () => {
  return useAuthStore.getState().credentials?.refresh_token;
};

export const getUserPermissions = () => {
  return useAuthStore.getState().permissions;
};
