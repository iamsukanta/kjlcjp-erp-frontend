import { create } from "zustand";
import type {Income}  from "../types/income";


interface IncomeState {
  income: Income,
  incomes: Income[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setIncomes: (data: Income[]) => void;
  setIncome: (data: Income) => void;
}

export const defaultIncome: Income = {
  title: "",
  source: "",
  amount: 0,
  collection_sin: "",
  collection_date: "",
  income_type: "",
  file: null,
  note: "",
};

export const useIncomeStore = create<IncomeState>((set) => ({
  income: defaultIncome,
  incomes: [],
  loading: false,
  setLoading: (loading) => set({ loading }),
  setIncomes: (data) => set({ incomes: data }),
  setIncome: (data) => set({ income: data }),
}));
