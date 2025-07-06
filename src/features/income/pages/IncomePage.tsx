import React from "react";
import Table from "@/components/ui/Table";

const Income: React.FC = () => {
  const columns = ["Date", "Amount", "Source", "Description"];
  const data = [
    { Date: "2025-07-01", Amount: "$1,200", Source: "Client A", Description: "Consulting" },
    { Date: "2025-07-03", Amount: "$500", Source: "Client B", Description: "Web Hosting" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Income Records</h1>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Income;
