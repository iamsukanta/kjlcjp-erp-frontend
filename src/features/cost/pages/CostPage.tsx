import React from "react";
import Table from "@/components/ui/Table";

const Cost: React.FC = () => {
  const columns = ["Date", "Amount", "Category", "Note"];
  const data = [
    { Date: "2025-07-02", Amount: "$200", Category: "Server", Note: "Monthly AWS bill" },
    { Date: "2025-07-04", Amount: "$75", Category: "Software", Note: "VS Code license" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Cost Records</h1>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Cost;
