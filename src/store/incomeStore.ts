import { create } from "zustand";
import type {Income}  from "../types/income";

interface IncomeState {
  incomes: Income[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setIncomes: (data: Income[]) => void;
}

export const useIncomeStore = create<IncomeState>((set) => ({
  incomes: [],
  loading: false,
  setLoading: (loading) => set({ loading }),
  setIncomes: (data) => set({ incomes: data }),
}));
