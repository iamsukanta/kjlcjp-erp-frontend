import { create } from "zustand";
import type {Income}  from "../types/income";


interface IncomeState {
  income: Income,
  incomes: Income[];
  page: number,
  limit: number,
  totalIncomeItems: number,
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setIncomes: (data: Income[]) => void;
  setIncome: (data: Income) => void;
  setPage: (data: number) => void;
  setLimit: (data: number) => void;
  setTotalIncomeItems: (data: number) => void;
}

export const defaultIncome: Income = {
  title: "",
  source: "",
  amount: 0,
  collection_sin: "",
  collection_date: "",
  income_type: "",
  income_document: "",
  note: "",
};

export const useIncomeStore = create<IncomeState>((set) => ({
  income: defaultIncome,
  incomes: [],
  page: 1,
  limit: 10,
  totalIncomeItems: 0,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setIncomes: (data) => set({ incomes: data }),
  setPage: (data: number) => set({ page: data }),
  setLimit: (data: number) => set({ limit: data }),
  setTotalIncomeItems: (data: number) => set({ totalIncomeItems: data }),
  setIncome: (data) => set({ income: data }),
}));
