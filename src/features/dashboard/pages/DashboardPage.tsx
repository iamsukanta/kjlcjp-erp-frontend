import StatCard from "@/components/ui/StatCard";

const Dashboard = () => {
  return (
    <div>
      {/* <h1 className="text-2xl font-semibold mb-6">Dashboard</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total School Income" value="$120,000" icon="💰" />
        <StatCard label="Total School Costs" value="$45,000" icon="💸" color="bg-red-100" />
        <StatCard label="Total School Profit" value="$75,000" icon="📈" color="bg-green-100" />
        <StatCard label="Total Company Income" value="$120,000" icon="💰" />
        <StatCard label="Total Company Costs" value="$45,000" icon="💸" color="bg-red-100" />
        <StatCard label="Total Company Profit" value="$75,000" icon="📈" color="bg-green-100" />
      </div>
    </div>
  );
};

export default Dashboard;
