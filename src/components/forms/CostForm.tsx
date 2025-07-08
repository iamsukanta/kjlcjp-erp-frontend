import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Cost } from "../../types/cost";
import { createCost, updateCost } from "../../services/costApi";

interface Props {
  initialData?: Cost;
  onSubmit: (data: Cost) => void;
  isEdit?: boolean;
}

const CostForm: React.FC<Props> = ({ initialData, onSubmit, isEdit }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Cost>(initialData || {
    title: "",
    voucher: "",
    amount: 0,
    entry_name: "",
    cost_date: "",
    cost_type: "",
    cost_document: "",
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
        await updateCost(Number(id), form)
      } else {
        await createCost(form);
      }
      
      navigate("/dashboard/cost");
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{id ? "Edit Cost" : "Create Cost"}</h2>

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
          <label className="block text-sm font-medium">Voucher</label>
          <input
            name="voucher"
            type="text"
            value={form.voucher}
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
          <label className="block text-sm font-medium">Entry Name</label>
          <input
            name="entry_name"
            type="text"
            value={form.entry_name}
            onChange={handleChange}
            className="border border-gray-400 input input-bordered w-full px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Cost Date</label>
          <input
            name="cost_date"
            type="datetime-local"
            value={form.cost_date?.slice(0, 16) || ""}
            onChange={handleChange}
            className="border border-gray-400 input input-bordered w-full px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Cost Type</label>
          <select
            name="cost_type"
            value={form.cost_type}
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
            initialData?.cost_document && (
              <div className="flex">
                <h4>Uploaded File: {initialData.cost_document}</h4>
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
            className="btn btn-primary bg-blue-500 px-6 py-2 text-white cursor-pointer"
            disabled={loading}
          >
            {loading ? "Saving..." : id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CostForm;
