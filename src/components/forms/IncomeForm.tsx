import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Income } from "../../types/income";
import { createIncome, updateIncome } from "../../services/incomeApi";

interface Props {
  initialData?: Income;
  onSubmit: (data: Income) => void;
  isEdit?: boolean;
}

const IncomeForm: React.FC<Props> = ({ initialData, onSubmit, isEdit }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  // const [form, setForm] = useState<Income>(initialData);
  const [form, setForm] = useState<Income>(initialData || {
    title: "",
    source: "",
    amount: 0,
    collection_sin: "",
    collection_date: "",
    income_type: "",
    note: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if(initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm({ ...form, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(id) {
        await updateIncome(Number(id), form)
      } else {
        await createIncome(form);
      }
      
      navigate("/dashboard/income");
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{id ? "Edit Income" : "Create Income"}</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className="border border-gray-400 input input-bordered w-full px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Source</label>
          <input
            name="source"
            type="text"
            value={form.source}
            onChange={handleChange}
            className="border border-gray-400 input input-bordered w-full px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            className="border border-gray-400 input input-bordered w-full px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Collection SIN</label>
          <input
            name="collection_sin"
            type="text"
            value={form.collection_sin}
            onChange={handleChange}
            className="border border-gray-400 input input-bordered w-full px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Collection Date</label>
          <input
            name="collection_date"
            type="datetime-local"
            value={form.collection_date?.slice(0, 16) || ""}
            onChange={handleChange}
            className="border border-gray-400 input input-bordered w-full px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Income Type</label>
          <select
            name="income_type"
            value={form.income_type}
            onChange={handleChange}
            className="border border-gray-400 input input-bordered w-full px-3 py-2 rounded"
            required
          >
            <option value="">Select type</option>
            <option value="school">School</option>
            <option value="company">Company</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">File (PDF/Image)</label>
          <input
            name="file"
            type="file"
            accept="application/pdf,image/*"
            onChange={handleFile}
            className="border border-gray-400 file-input file-input-bordered w-full px-3 py-2 rounded"
          />
          {
            initialData?.file && (
              <div className="flex">
                <h4>Uploaded File: {initialData.file}</h4>
              </div>
            )
          }
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Note</label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            className="border border-gray-400 textarea textarea-bordered w-full px-3 py-2 rounded"
            rows={4}
          />
        </div>

        <div className="md:col-span-2 text-right mt-4">
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 px-6 py-2"
            disabled={loading}
          >
            {loading ? "Saving..." : id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;
