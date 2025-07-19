import CostForm from "../../../components/forms/CostForm";
import { defaultCost } from "../../../store/costStore";

const CreateCostPage = () => {
  return (
    <div className="p-6">
      <CostForm initialData={defaultCost} />
    </div>
  );
};

export default CreateCostPage;
