interface StatCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  color?: string;
}

const StatCard = ({ label, value, icon, color = "bg-blue-100" }: StatCardProps) => {
  return (
    <div className={`p-6 rounded shadow ${color} flex items-center gap-4`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
