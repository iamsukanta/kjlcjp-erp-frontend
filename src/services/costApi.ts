import api from "../api/axios";
import type { Cost } from "../types/cost";

export const getCosts = async (filters: any, page:number, limit:number): Promise<any> => {
  try {
    const params = new URLSearchParams();
    if (filters.type) params.append("cost_type", filters.type);
    if (filters.titleSearch) params.append("title", filters.titleSearch);
    if (filters.dateRange) params.append("date_range", filters.dateRange);
    if (filters.dateRange === "custom") {
      if (filters.customFrom) params.append("from_date", filters.customFrom);
      if (filters.customTo) params.append("to_date", filters.customTo);
    }

    params.append("page", page);
    params.append("limit", limit);
    const res = await api.get(`/costs?${params.toString()}`);
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
  try {
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
  } catch( err: any) {
    throw new Error(err.response?.data?.detail || "Failed to update costs");
  }
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
