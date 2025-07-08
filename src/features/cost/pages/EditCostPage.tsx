import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CostForm from "../../../components/forms/CostForm";
import { getCostById, updateCost } from "../../../services/costApi";
import { useCostStore, defaultCost } from "../../../store/costStore";
import type { Cost } from "../../../types/cost";
import { toast } from "react-toastify";

const EditCostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cost, setCost, setLoading } = useCostStore();

  useEffect(() => {
    const fetchCost = async () => {
      try {
        setLoading(true);
        const data = await getCostById(Number(id));
        setCost(data);
      } catch (err: any) {
        setCost(defaultCost)
        console.error("Failed to load cost", err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCost();
  }, [id]);

  const handleSubmit = async (data: Cost) => {
    try {
      await updateCost(Number(id), data);
      navigate("/costs");
    } catch (err) {
      console.error("Update error", err);
    }
  };

  if (!cost) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <CostForm initialData={cost} onSubmit={handleSubmit} isEdit />
    </div>
  );
};

export default EditCostPage;
