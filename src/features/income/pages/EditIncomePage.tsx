import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IncomeForm from "../../../components/forms/IncomeForm";
import { getIncomeById, updateIncome } from "../../../services/incomeApi";
import type { Income } from "../../../types/income";

const EditIncomePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [income, setIncome] = useState<Income | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getIncomeById(Number(id));
      setIncome(data);
    })();
  }, [id]);

  const handleSubmit = async (data: Income) => {
    try {
      await updateIncome(Number(id), data);
      navigate("/incomes");
    } catch (err) {
      console.error("Update error", err);
    }
  };

  if (!income) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Income</h1>
      <IncomeForm initialData={income} onSubmit={handleSubmit} isEdit />
    </div>
  );
};

export default EditIncomePage;
