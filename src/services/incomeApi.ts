import api from "../api/axios"; // your axios instance
import type { Income } from "../types/income";

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
};

export const getIncomeById = async (id: number) => {
  const res = await api.get(`/incomes/${id}`);
  return res.data;
};
