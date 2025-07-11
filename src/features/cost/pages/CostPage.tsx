import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, {useEffect, useState, useRef} from "react";
import Table from "@/components/ui/Table";
import { useCostStore, getCurrentPage, getPageLimit, getCostsList, getTotalCostItems } from "../../../store/costStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { WithPermission } from "../../../components/hoc/WithPermission";
import { getCosts, deleteCostById } from "../../../services/costApi";
import ItemFilter from "../../../components/filters/ItemFilter";
import Pagination from "../../../components/pagination/pagination";

const Cost: React.FC = () => {
  const navigate = useNavigate();
  const setCosts = useCostStore((state) => state.setCosts);
  const setPage = useCostStore((state) => state.setPage);
  const setLimit = useCostStore((state) => state.setLimit);
  const setTotalCostItems = useCostStore((state) => state.setTotalCostItems);
  const costs = getCostsList();
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    type: "",
    dateRange: "",
    customFrom: "",
    customTo: "",
    titleSearch: ""
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetchData(debouncedFilters);
  }, [debouncedFilters]);

  const fetchData = async (activeFilters: typeof filters) => {
    setLoading(true);
    try {
      if (activeFilters.dateRange === "custom") {
        if (activeFilters.customFrom && activeFilters.customTo) {
          const {items, page, limit, total} = await getCosts(activeFilters, getCurrentPage(), getPageLimit());
          setCosts(items);
          setPage(page);
          setLimit(limit);
          setTotalCostItems(total);
        }
      } else {
        const {items, page, limit, total} = await getCosts(activeFilters, getCurrentPage(), getPageLimit());
        setCosts(items);
        setPage(page);
        setLimit(limit);
        setTotalCostItems(total);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => {
      let updated = { ...prev, [name]: value };
      if(name == "dateRange" && value == "custom") {
        updated = { ...prev, [name]: value, ["customFrom"]: "", ["customTo"]: "" };
      }
      if (name === "titleSearch") {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
          setDebouncedFilters(updated);
        }, 500);
      } else {
        setDebouncedFilters(updated);
      }
      return updated;
    });
  };

  const resetFilters = () => {
    setFilters({
      type: "",
      dateRange: "",
      customFrom: "",
      customTo: "",
      titleSearch: ""
    });
    fetchData({
      type: "",
      dateRange: "",
      customFrom: "",
      customTo: "",
      titleSearch: ""
    });
  };

  const gotoCreateCostPage = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard/costs/create");
  };

  const calculateTotalCost = () => {
    let totalCost:number = 0;
    costs.forEach((cost) => {
      totalCost = totalCost + cost.amount
    });
    return totalCost;
  }

  const totalPages = Math.ceil(getTotalCostItems()/getPageLimit());
  const changePage = (value: number) => {
    setPage(value);
    setTimeout(() => {
      fetchData(debouncedFilters);
    }, 10);
  }
  const columns = ["Title", "Created Date", "Voucher", "Cost Type", "Amount"];
  const tableData = costs.map((cost) => ({
    id: cost.id,
    "Created Date": cost.created_at?.slice(0, 10) || "-",
    Amount: `${cost.amount}`,
    Voucher: cost.voucher || "-",
    Title: cost.title,
    "Cost Type": cost?.cost_type.toUpperCase()
  }));

  const handleView = (id: number) => navigate(`/dashboard/costs/view/${id}`);
  const handleEdit = (id: number) => navigate(`/dashboard/costs/edit/${id}`);
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this record?")) {
      try {
        setLoading(true);
        await deleteCostById(Number(id));
        let data = costs.filter(item => item.id != id);
        setCosts(data);
      } catch (err: any) {
        console.error("Failed to load cost", err);
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

      <hr className="my-3" /> <br />

      <div className="flex justify-end items-center">
        <ItemFilter filters={filters} onChange={handleFilterChange} onReset={resetFilters} />
      </div>

      <br />

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading costs...</div>
      ) : (
        <div>
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
                <WithPermission permission="delete_company">
                  <button
                    onClick={() => handleDelete(id)}
                    className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </WithPermission>
              </>
            )}
            totalAmount = { calculateTotalCost() }
          />

          <Pagination
            currentPage={getCurrentPage()}
            totalPages={totalPages}
            onPageChange={(newPage: number) => changePage(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default Cost;
