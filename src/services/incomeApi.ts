import api from "../api/axios"; // your axios instance
import type { Income } from "../types/income";

export const getIncomes = async (): Promise<Income[]> => {
  try {
    const res = await api.get("/incomes");
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to load incomes");
  }
};

export const createIncome = async (data: Income) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key as keyof Income]) {
      formData.append(key, data[key as keyof Income] as any);
    }
  }

  const res = await api.post("/incomes", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateIncome = async (id: number, data: Income) => {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (data[key as keyof Income]) {
        formData.append(key, data[key as keyof Income] as any);
      }
    }

    const res = await api.put(`/incomes/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch( err: any) {
    throw new Error(err.response?.data?.detail || "Failed to update incomes");
  }
};

export const getIncomeById = async (id: number) => {
  try {
    const res = await api.get(`/incomes/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to load incomes");
  }
};

export const deleteIncomeById = async (id: number) => {
  try {
    const res = await api.delete(`/incomes/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to delete incomes.");
  }
};
