import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IncomeForm from "../../../components/forms/IncomeForm";
import { getIncomeById, updateIncome } from "../../../services/incomeApi";
import { useIncomeStore, defaultIncome } from "../../../store/incomeStore";
import type { Income } from "../../../types/income";
import { toast } from "react-toastify";

const EditIncomePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { income, setIncome, setLoading } = useIncomeStore();

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        setLoading(true);
        const data = await getIncomeById(Number(id));
        setIncome(data);
      } catch (err: any) {
        setIncome(defaultIncome)
        console.error("Failed to load income", err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchIncome();
  }, [id]);

  if (!income) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <IncomeForm initialData={income} />
    </div>
  );
};

export default EditIncomePage;
