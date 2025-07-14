import { create } from "zustand";
import type { DashboardStatistics } from "../types/dashboard";

interface DashboardState {
  dashboardProfitStatistics: DashboardStatistics | {};
  setDashboardProfitStatistics: ( dashboardStatistics: DashboardStatistics) => void;
}

export const defaultDashboardStatistics: DashboardStatistics = {
  totalCompanyIncome: 0,
  totalCompanyCost: 0,
  totalCompanyProfit: 0,
  totalSchoolIncome: 0,
  totalSchoolCost: 0,
  totalSchoolProfit: 0,
};

export const useDashboardStore = create<DashboardState>()(
    (set) => ({
      dashboardProfitStatistics: defaultDashboardStatistics,
      setDashboardProfitStatistics: (dashboardProfitStatistics: DashboardStatistics) => set({ dashboardProfitStatistics })
    })
);

export const getDashboardStatisticsData = () => {
  return useDashboardStore.getState().dashboardProfitStatistics;
};

