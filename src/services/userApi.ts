import api from "../api/axios";
import type { Permission, Role, User } from "../types/user";

export const getUsers = async (): Promise<any> => {
  try {
    const res = await api.get(`/users`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to load costs");
  }
};

export const createUser = async (data: any) => {
  const formData = new FormData();
  for (const key in data) {
    if(key !== 'role_ids') {
      if (data[key as keyof User]) {
        formData.append(key, data[key as keyof User] as any);
      }
    }
  };

  data.role_ids.forEach((roleId: number) => {
    formData.append("role_ids", String(roleId));
  });

  const res = await api.post("/users", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const getRoles = async (): Promise<any> => {
  try {
    const res = await api.get(`/roles`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to load costs");
  }
};

export const getPermissions = async (): Promise<any> => {
  try {
    const res = await api.get(`/permissions`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to load costs");
  }
};