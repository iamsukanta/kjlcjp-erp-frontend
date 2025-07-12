import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, {useState, useEffect} from "react";
import Table from "@/components/ui/Table";
import type { Role, User as UserType } from "@/types/user";
import { WithPermission } from "../../../components/hoc/WithPermission";
import {  useUserStore, getUsersList, getRolesList } from "../../../store/userStore";
import BaseModal from "../../../components/modals/BaseModal";
import UserForm from "../../../components/forms/UserForm";
import {createUser, getPermissions, getRoles, getUsers } from "../../../services/userApi";

const User: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const setUsers = useUserStore((state) => state.setUsers);
  const setRoles = useUserStore((state) => state.setRoles);
  const setPermissions = useUserStore((state) => state.setPermissions);
  const columns = ["Name", "Email", "Role"];
  const tableData = getUsersList().map((user) => ({
    id: user.id,
    Name: user.name,
    Email: user.email,
    Role: user.roles.map(r => r.name).join(", ")
  }));
  useEffect(() => {
    fetchUsersRolesPermissions();
  }, []);

  const fetchUsersRolesPermissions = async () => {
    setLoading(true);
    try {
      const users = await getUsers();
      const roles = await getRoles();
      const permissions = await getPermissions();
      setUsers(users);
      setRoles(roles);
      setPermissions(permissions);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData: UserType) => {
    let role_ids: number[] = [];
    formData.roles.forEach((role: Role) => {
      role_ids.push(role.id);
    });
    formData.role_ids = role_ids;
    delete formData.roles;
    const new_user = await createUser(formData);
    const users = getUsersList();
    setUsers([...users, new_user]);
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-4">Users Records</h1>
        <button
          type="button"
          className="w-auto px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer"
          onClick={() => {
            setSelectedUser(null);
            setModalOpen(true);
          }}
        >
          Create User
        </button>
      </div>

      <hr className="my-3" /> <br />

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading incomes...</div>
      ) : (
        <div>
          <div>
            <Table
              columns={columns}
              data={tableData}
              renderActions={(id:number) => (
                <>
                  <button
                    className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>
                  <button
                    className="p-1 text-yellow-600 hover:text-yellow-800 cursor-pointer"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <WithPermission permission="delete_user">
                    <button
                      className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </WithPermission>
                </>
              )}
            />
          </div>

          <BaseModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title={selectedUser ? "Edit User" : "Create User"}
          >
            <UserForm
              initialData={selectedUser}
              onCancel={() => setModalOpen(false)}
              onSave={handleSave}
              allRoles={getRolesList()}
            />
          </BaseModal>
        </div>
      )}
    </div>
  );
};

export default User;
