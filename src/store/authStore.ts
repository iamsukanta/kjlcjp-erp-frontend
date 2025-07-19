import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios";
import { getUserPermissionsFromRoles } from "../utils/permission";

interface AuthState {
  credentials: { access_token: string, refresh_token: string, type: string } | null;
  user: { id: string; name: string; email: string, roles: [] } | null;
  permissions: string[];
  fetchUser: () => Promise<void>;
  login: (credentials: AuthState["credentials"], user: AuthState["user"]) => void;
  logout: () => void;
  setPermissions: (permissions: AuthState['permissions']) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      credentials: null,
      user: null,
      permissions: [],
      login: (credentials, user) => set({ credentials, user }),
      logout: () => set({ credentials: null, user: null, permissions: [] }),
      setPermissions: (permissions) => set({ permissions }),
      fetchUser: async () => {
        try {
          const res = await api.get("/auth/me", {
            headers: { Authorization: `Bearer ${get()?.credentials?.access_token}` },
          });
          set({ user: res.data });
          set({ permissions: await getUserPermissionsFromRoles(res.data.roles)})
        } catch (err) {
          console.error("Failed to fetch user", err);
          set({ user: null, credentials: null, permissions: [] });
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);

export const getAuthToken = () => {
  return useAuthStore.getState().credentials?.access_token;
};

export const getAuthUserInformation = () => {
  return useAuthStore.getState().user;
};

export const getRefreshToken = () => {
  return useAuthStore.getState().credentials?.refresh_token;
};

export const getUserPermissions = () => {
  return useAuthStore.getState().permissions;
};
