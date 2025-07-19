import IncomeForm from "../../../components/forms/IncomeForm";
import { defaultIncome } from "../../../store/incomeStore";

const CreateIncomePage = () => {
  return (
    <div className="p-6">
      <IncomeForm initialData={defaultIncome}/>
    </div>
  );
};

export default CreateIncomePage;
