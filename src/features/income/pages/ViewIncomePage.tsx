import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIncomeById } from "../../../services/incomeApi";
import type { Income } from "../../../types/income";
import { toast } from "react-toastify";

const ViewIncomePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [income, setIncome] = useState<Income | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        setLoading(true);
        const data = await getIncomeById(Number(id));
        setIncome(data);
      } catch (error: any) {
        toast.error("Failed to fetch income.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchIncome();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!income) return <div className="p-6">Income not found</div>;

  const isPdf = income?.income_document?.endsWith(".pdf");
  const isImage = income?.income_document?.match(/\.(jpeg|jpg|png|gif|webp)$/i);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">View Income</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><span className="font-semibold">Title:</span> {income.title}</div>
        <div><span className="font-semibold">Amount:</span> ${income.amount}</div>
        <div><span className="font-semibold">Source:</span> {income.source || "-"}</div>
        <div><span className="font-semibold">Type:</span> {income.income_type}</div>
        <div><span className="font-semibold">Collected By:</span> {income.collection_sin || "-"}</div>
        <div><span className="font-semibold">Collection Date:</span> {income.collection_date || "-"}</div>
        <div className="sm:col-span-2">
          <span className="font-semibold">Note:</span>
          <p className="mt-1 text-gray-700">{income.note || "-"}</p>
        </div>
      </div>

      {/* File Viewer */}
      {income.income_document && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Uploaded File:</h3>
          {isImage && (
            <img
              src={income.income_document}
              alt="Uploaded Income File"
              className="max-w-full h-auto rounded border"
            />
          )}
          {isPdf && (
            <iframe
              src={income.income_document}
              title="PDF Viewer"
              className="w-full h-[600px] border rounded"
            />
          )}
          {!isImage && !isPdf && (
            <p className="text-red-500">Unsupported file format</p>
          )}
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => navigate("/dashboard/incomes")}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default ViewIncomePage;
