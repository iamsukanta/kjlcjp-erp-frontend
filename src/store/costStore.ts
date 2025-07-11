import { create } from "zustand";
import type {Cost}  from "../types/cost";


interface CostState {
  cost: Cost,
  costs: Cost[];
  page: number,
  limit: number,
  totalCostItems: number,
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setCosts: (data: Cost[]) => void;
  setCost: (data: Cost) => void;
  setPage: (data: number) => void;
  setLimit: (data: number) => void;
  setTotalCostItems: (data: number) => void;
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
  page: 1,
  limit: 10,
  totalCostItems: 0,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setCosts: (data) => set({ costs: data }),
  setPage: (data: number) => set({ page: data }),
  setLimit: (data: number) => set({ limit: data }),
  setTotalCostItems: (data: number) => set({ totalCostItems: data }),
  setCost: (data) => set({ cost: data }),
}));

export const getCurrentPage = () => {
  return useCostStore.getState().page;
};

export const getPageLimit = () => {
  return useCostStore.getState().limit;
};

export const getCostsList = () => {
  return useCostStore.getState().costs;
}

export const getCostDetails = () => {
  return useCostStore.getState().cost;
}

export const getTotalCostItems = () => {
  return useCostStore.getState().totalCostItems;
}

export const getLoadingState = () => {
  return useCostStore.getState().loading;
}
