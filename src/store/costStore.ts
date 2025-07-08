import { create } from "zustand";
import type {Cost}  from "../types/cost";


interface CostState {
  cost: Cost,
  costs: Cost[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setCosts: (data: Cost[]) => void;
  setCost: (data: Cost) => void;
}

export const defaultCost: Cost = {
  title: "",
  voucher: "",
  amount: 0,
  entry_name: "",
  cost_date: "",
  cost_type: "",
  cost_document: "",
  note: "",
};

export const useCostStore = create<CostState>((set) => ({
  cost: defaultCost,
  costs: [],
  loading: false,
  setLoading: (loading) => set({ loading }),
  setCosts: (data) => set({ costs: data }),
  setCost: (data) => set({ cost: data }),
}));
