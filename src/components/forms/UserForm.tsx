// components/users/UserForm.tsx
import React, { useEffect, useState } from "react";
import type { Role, User } from "@/types/user";

interface UserFormProps {
  initialData?: User | null;
  onSave: (user: User) => void;
  onCancel: () => void;
  allRoles: Role[];
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSave, onCancel, allRoles }) => {
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    password: "",
    file: "",
    roles: [],
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleRole = (role: Role) => {
    setForm((prev: User) => {
      const exists = prev.roles.some((r: Role) => r.id === role.id);
      const updatedRoles = exists
        ? prev.roles.filter((r: Role) => r.id !== role.id)
        : [...prev.roles, role];
      return { ...prev, roles: updatedRoles };
    });
  };

  return (
    <form onSubmit={(e) => {e.preventDefault(); onSave(form)}}>
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
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />

        <div className="mb-4">
          <label className="block mb-2 font-medium">Roles</label>
          <div className="flex flex-col space-y-2">
            {allRoles.map((role) => (
              <label key={role.id} className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.roles.some((r) => r.id === role.id)}
                  onChange={() => toggleRole(role)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-800">{role.name}</span>
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

export default UserForm;
