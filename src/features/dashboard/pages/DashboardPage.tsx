import StatCard from "@/components/ui/StatCard";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Income" value="$120,000" icon="💰" />
        <StatCard label="Total Costs" value="$45,000" icon="💸" color="bg-red-100" />
        <StatCard label="Profit" value="$75,000" icon="📈" color="bg-green-100" />
      </div>
    </div>
  );
};

export default Dashboard;
