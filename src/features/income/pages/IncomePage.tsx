import React from "react";
import Table from "@/components/ui/Table";
import { useNavigate } from "react-router-dom";

const Income: React.FC = () => {
  const navigate = useNavigate();
  const columns = ["Date", "Amount", "Source", "Description"];
  const data = [
    { Date: "2025-07-01", Amount: "$1,200", Source: "Client A", Description: "Consulting" },
    { Date: "2025-07-03", Amount: "$500", Source: "Client B", Description: "Web Hosting" },
  ];

  const gotoCreateIncomePage = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard/income/create");
  };

  return (
    <div className="p-6">
      
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-4">Income Records</h1>
        <button
          onClick={gotoCreateIncomePage}
          type="button"
          className="w-auto px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer"
        >
          Create Income
        </button>
      </div>
      <br />
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Income;
