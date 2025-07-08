import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCostById } from "../../../services/costApi";
import type { Cost } from "../../../types/cost";
import { toast } from "react-toastify";

const ViewCostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cost, setCost] = useState<Cost | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCost = async () => {
      try {
        setLoading(true);
        const data = await getCostById(Number(id));
        setCost(data);
      } catch (error: any) {
        toast.error("Failed to fetch cost.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCost();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!cost) return <div className="p-6">Cost not found</div>;

  const isPdf = cost?.cost_document?.endsWith(".pdf");
  const isImage = cost?.cost_document?.match(/\.(jpeg|jpg|png|gif|webp)$/i);
  const documentSrc = (value: string) => {
    return `${import.meta.env.VITE_BASE_URL}/${value}`
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">VIEW COST</h1>
      <hr /> <br />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><span className="font-semibold">Title:</span> {cost.title}</div>
        <div><span className="font-semibold">Amount:</span> ${cost.amount}</div>
        <div><span className="font-semibold">Source:</span> {cost.voucher || "-"}</div>
        <div><span className="font-semibold">Type:</span> {cost.cost_type}</div>
        <div><span className="font-semibold">Entry Name:</span> {cost.entry_name || "-"}</div>
        <div><span className="font-semibold">Collection Date:</span> {cost.cost_date || "-"}</div>
        <div className="sm:col-span-2">
          <span className="font-semibold">Note:</span>
          <p className="mt-1 text-gray-700">{cost.note || "-"}</p>
        </div>
      </div>

      {/* File Viewer */}
      {cost.cost_document && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Uploaded File:</h3>
          {isImage && (
            <img
              src={documentSrc(cost.cost_document)}
              alt="Uploaded Cost File"
              className="max-w-full h-auto rounded border"
            />
          )}
          {isPdf && (
            <iframe
              src={documentSrc(cost.cost_document)}
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
          onClick={() => navigate("/dashboard/costs")}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default ViewCostPage;
