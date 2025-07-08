import api from "../api/axios"; // your axios instance
import type { Cost } from "../types/cost";

export const getCosts = async (): Promise<Cost[]> => {
  try {
    const res = await api.get("/costs");
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to load costs");
  }
};

export const createCost = async (data: Cost) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key as keyof Cost]) {
      formData.append(key, data[key as keyof Cost] as any);
    }
  }

  const res = await api.post("/costs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateCost = async (id: number, data: Cost) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key as keyof Cost]) {
      formData.append(key, data[key as keyof Cost] as any);
    }
  }

  const res = await api.put(`/costs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getCostById = async (id: number) => {
  try {
    const res = await api.get(`/costs/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to load costs");
  }
};

export const deleteCostById = async (id: number) => {
  try {
    const res = await api.delete(`/costs/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to delete costs.");
  }
};
