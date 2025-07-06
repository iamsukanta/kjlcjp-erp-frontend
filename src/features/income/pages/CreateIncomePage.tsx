import IncomeForm from "../../../components/forms/IncomeForm";
import { createIncome } from "../../../services/incomeApi";
import { useNavigate } from "react-router-dom";

const CreateIncomePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      await createIncome(data);
      navigate("/incomes");
    } catch (error) {
      console.error("Create income error", error);
    }
  };

  return (
    <div className="p-6">
      <IncomeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateIncomePage;
