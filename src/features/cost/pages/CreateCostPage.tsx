import CostForm from "../../../components/forms/CostForm";
import { createCost } from "../../../services/costApi";
import { useNavigate } from "react-router-dom";
import { defaultCost } from "../../../store/costStore";

const CreateCostPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      await createCost(data);
      navigate("/costs");
    } catch (error) {
      console.error("Create cost error", error);
    }
  };

  return (
    <div className="p-6">
      <CostForm initialData={defaultCost} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateCostPage;
