import StatCard from "@/components/ui/StatCard";
import React, {useEffect, useState} from "react";
import { useDashboardStore, getDashboardStatisticsData } from "../../../store/dashboardStore";
import { getDashboardStatistics } from "../../../services/dashboardApi";
import { WithPermission } from "../../../components/hoc/WithPermission";
const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const setDashboardProfitStatistics = useDashboardStore((state) => state.setDashboardProfitStatistics);
  const dashboardsStatistics = getDashboardStatisticsData();
  useEffect(() => {
    fetchDashboardProfitStatistics()
  }, []);

  const fetchDashboardProfitStatistics = async () => {
    setLoading(true);
    try {
      const data = await getDashboardStatistics();
      setDashboardProfitStatistics(data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading dashboard statistics...</div>
      ):(
        <WithPermission permission="dashboard_statistics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total School Income" value={dashboardsStatistics?.totalSchoolIncome} icon="💰" />
            <StatCard label="Total School Costs" value={dashboardsStatistics?.totalSchoolCost} icon="💸" color="bg-red-100" />
            <StatCard label="Total School Profit" value={dashboardsStatistics?.totalSchoolProfit} icon="📈" color="bg-green-100" />
            <StatCard label="Total Company Income" value={dashboardsStatistics?.totalCompanyIncome} icon="💰" />
            <StatCard label="Total Company Costs" value={dashboardsStatistics?.totalCompanyCost} icon="💸" color="bg-red-100" />
            <StatCard label="Total Company Profit" value={dashboardsStatistics?.totalCompanyProfit} icon="📈" color="bg-green-100" />
          </div>
        </WithPermission>
      )}
    </div>
  )
};

export default Dashboard;
