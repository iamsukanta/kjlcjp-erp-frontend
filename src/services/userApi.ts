import api from "../api/axios";
import type { User } from "../types/user";

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

export const updateUser = async (data: any, userId: number) => {
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

  const res = await api.put(`/users/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};


export const deleteUser = async (userId: number) => {
  const res = await api.delete(`/users/${userId}`, {
    headers: { "Content-Type": "application/json" },
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

export const createRole = async (data: any) => {
  const res = await api.post("/roles", data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const updateRole = async (data: any, roleId: number) => {
  const res = await api.put(`/roles/${roleId}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const deleteRole = async (roleId: number) => {
  const res = await api.delete(`/roles/${roleId}`, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const getPermissions = async (): Promise<any> => {
  try {
    const res = await api.get(`/permissions`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to load costs");
  }
};

export const createPermission = async (data: any) => {
  const res = await api.post("/permissions", data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const updatePermission = async (data: any, permissionId: number) => {
  const res = await api.put(`/permissions/${permissionId}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const deletePermission = async (permissionId: number) => {
  const res = await api.delete(`/permissions/${permissionId}`, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};