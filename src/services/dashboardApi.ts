import api from "../api/axios";
export const getDashboardStatistics = async (): Promise<any> => {
  try {
    const res = await api.get(`/dashboards`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to load dashboard statistics.");
  }
};