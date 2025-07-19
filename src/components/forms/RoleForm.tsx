import React, { useEffect, useState } from "react";
import type { Role, Permission } from "@/types/user";

interface RoleFormProps {
  initialData?: Role | null;
  onSave: (role: Role) => void;
  onCancel: () => void;
  allPermissions: Permission[];
}

const RoleForm: React.FC<RoleFormProps> = ({ initialData, onSave, onCancel, allPermissions }) => {
  const [form, setForm] = useState<Role>({
    name: "",
    permissions: [],
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        permissions: initialData.permissions || [],
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleRole = (role: Role) => {
    setForm((prev: Role) => {
      const exists = prev.permissions.some((r: Role) => r.id === role.id);
      const updatedRoles = exists
        ? prev.permissions.filter((r: Role) => r.id !== role.id)
        : [...prev.permissions, role];
      return { ...prev, permissions: updatedRoles };
    });
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

        <div className="mb-4">
          <div className="flex flex-row justify-between">
            <h5 className="block mb-2 font-medium">Assign Permissions</h5>
          </div>
          <hr className="mt-0 mb-4" />
          <div className="grid grid-cols-3 gap-4 space-y-2">
            {allPermissions.map((permission) => (
              <label key={`permissions-${permission.id}`} className="inline-flex items-center space-x-2">
                <input
                  name="permissionCheckbox"
                  type="checkbox"
                  checked={form?.permissions?.some((r:Role) => r.id === permission.id)}
                  onChange={() => toggleRole(permission)}
                  className="form-checkbox h-5 w-5 text-blue-600 cursor-pointe"
                />
                <span className="text-gray-800">{permission.name}</span>
              </label>
            ))}
          </div>
        </div>

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

export default RoleForm;