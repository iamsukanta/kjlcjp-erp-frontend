import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import Table from "@/components/ui/Table";
import { useCostStore } from "../../../store/costStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCosts, deleteCostById } from "../../../services/costApi";

const Cost: React.FC = () => {
  const navigate = useNavigate();
  const setCosts = useCostStore((state) => state.setCosts);
  const costs = useCostStore((state) => state.costs);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCosts();
        setCosts(data);
      } catch (error: any) {
        toast.error(error.message); // Clean error from service
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const gotoCreateCostPage = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard/Cost/create");
  };

  const columns = ["Date", "Amount", "Voucher", "Title"];
  const tableData = costs.map((Cost) => ({
    id: Cost.id,
    Date: Cost.cost_date?.slice(0, 10) || "-",
    Amount: `$${Cost.amount}`,
    Voucher: Cost.voucher || "-",
    Title: Cost.title,
  }));

  const handleView = (id: number) => navigate(`/dashboard/Costs/view/${id}`);
  const handleEdit = (id: number) => navigate(`/dashboard/Costs/edit/${id}`);
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this record?")) {
      try {
        setLoading(true);
        await deleteCostById(Number(id));
        let data = costs.filter(item => item.id != id);
        setCosts(data);
      } catch (err: any) {
        console.error("Failed to load Cost", err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-4">Cost Records</h1>
        <button
          onClick={gotoCreateCostPage}
          type="button"
          className="w-auto px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer"
        >
          Create Cost
        </button>
      </div>

      <br />

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading costs...</div>
      ) : (
        <Table
          columns={columns}
          data={tableData}
          renderActions={(id:number) => (
            <>
              <button
                onClick={() => handleView(id)}
                className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <EyeIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleEdit(id)}
                className="p-1 text-yellow-600 hover:text-yellow-800 cursor-pointer"
              >
                <PencilSquareIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(id)}
                className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </>
          )}
        />
      )}
    </div>
  );
};

export default Cost;
