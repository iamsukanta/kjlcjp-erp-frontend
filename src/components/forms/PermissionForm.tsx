import React, { useEffect, useState } from "react";
import type { Permission } from "@/types/user";

interface PermissionFormProps {
  initialData?: Permission | null;
  onSave: (role: Permission) => void;
  onCancel: () => void;
}

const PermissionForm: React.FC<PermissionFormProps> = ({ initialData, onSave, onCancel }) => {
  const [form, setForm] = useState<Permission>({
    name: ""
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || ""
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
          required
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded cursor-pointer">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default PermissionForm;