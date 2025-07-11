import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, {useEffect, useState, useRef} from "react";
import Table from "@/components/ui/Table";
import { useIncomeStore, getCurrentPage, getPageLimit, getIncomesList, getTotalIncomeItems } from "../../../store/incomeStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { WithPermission } from "../../../components/hoc/WithPermission";
import { getIncomes, deleteIncomeById } from "../../../services/incomeApi";
import ItemFilter from "../../../components/filters/ItemFilter";
import Pagination from "../../../components/pagination/pagination";

const Income: React.FC = () => {
  const navigate = useNavigate();
  const setIncomes = useIncomeStore((state) => state.setIncomes);
  const setPage = useIncomeStore((state) => state.setPage);
  const setLimit = useIncomeStore((state) => state.setLimit);
  const setTotalIncomeItems = useIncomeStore((state) => state.setTotalIncomeItems);
  const incomes = getIncomesList();
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
          const {items, page, limit, total} = await getIncomes(activeFilters, getCurrentPage(), getPageLimit());
          setIncomes(items);
          setPage(page);
          setLimit(limit);
          setTotalIncomeItems(total);
        }
      } else {
        const {items, page, limit, total} = await getIncomes(activeFilters, getCurrentPage(), getPageLimit());
        setIncomes(items);
        setPage(page);
        setLimit(limit);
        setTotalIncomeItems(total);
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

  const gotoCreateIncomePage = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard/incomes/create");
  };

  const calculateTotalIncome = () => {
    let totalIncome:number = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount
    });
    return totalIncome;
  }

  const totalPages = Math.ceil(getTotalIncomeItems()/getPageLimit());
  const changePage = (value: number) => {
    setPage(value);
    setTimeout(() => {
      fetchData(debouncedFilters);
    }, 10);
  }
  const columns = ["Title", "Created Date", "Source", "Income Type", "Amount"];
  const tableData = incomes.map((income) => ({
    id: income.id,
    "Created Date": income.created_at?.slice(0, 10) || "-",
    Amount: `${income.amount}`,
    Source: income.source || "-",
    Title: income.title,
    "Income Type": income?.income_type.toUpperCase()
  }));

  const handleView = (id: number) => navigate(`/dashboard/incomes/view/${id}`);
  const handleEdit = (id: number) => navigate(`/dashboard/incomes/edit/${id}`);
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this record?")) {
      try {
        setLoading(true);
        await deleteIncomeById(Number(id));
        let data = incomes.filter(item => item.id != id);
        setIncomes(data);
      } catch (err: any) {
        console.error("Failed to load income", err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
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

      <hr className="my-3" /> <br />

      <div className="flex justify-end items-center">
        <ItemFilter filters={filters} onChange={handleFilterChange} onReset={resetFilters} />
      </div>

      <br />

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading incomes...</div>
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
            totalAmount = { calculateTotalIncome() }
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

export default Income;
