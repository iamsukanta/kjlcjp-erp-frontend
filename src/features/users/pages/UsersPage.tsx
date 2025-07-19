import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, {useState, useEffect} from "react";
import Table from "@/components/ui/Table";
import type { Role, User as UserType } from "@/types/user";
import { WithPermission } from "../../../components/hoc/WithPermission";
import { useHasPermission } from "../../../hooks/useHasPermission";
import {  useUserStore, getUsersList, getRolesList } from "../../../store/userStore";
import BaseModal from "../../../components/modals/BaseModal";
import UserForm from "../../../components/forms/UserForm";
import {createUser, updateUser, deleteUser, getPermissions, getRoles, getUsers } from "../../../services/userApi";

const User: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const setUsers = useUserStore((state) => state.setUsers);
  const setRoles = useUserStore((state) => state.setRoles);
  const setPermissions = useUserStore((state) => state.setPermissions);

  const canEdit = useHasPermission("update_user");
  const canDelete = useHasPermission("delete_user");

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
      const results = await Promise.allSettled([
        getUsers(),
        getRoles(),
        getPermissions(),
      ]);

      if (results[0].status === "fulfilled") setUsers(results[0].value);
      if (results[1].status === "fulfilled") setRoles(results[1].value);
      if (results[2].status === "fulfilled") setPermissions(results[2].value);

      // Optional error logging
      results.forEach((res, i) => {
        if (res.status === "rejected") {
          console.error(`API ${i} failed:`, res.reason);
        }
      });
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData: UserType) => {
    try {
      let role_ids: number[] = [];
      formData?.roles.forEach((role: Role) => {
        role_ids.push(role.id);
      });
      formData.role_ids = role_ids;
      delete formData.roles;
      if(selectedUser?.id) {
        const userUpdate = await updateUser(formData, selectedUser.id);
        let users: UserType[] = getUsersList();
        let mapUsers = users.map((user) =>
          user.id === userUpdate.id ? userUpdate : user
        );
        setUsers(mapUsers);
        setModalOpen(false);
      } else {
        const new_user = await createUser(formData);
        const users: UserType[] = getUsersList();
        users.push(new_user)
        setUsers(users);
        setModalOpen(false);
      }
    } catch(error: any) {
      alert(error?.response?.data?.detail??'Something went wrong.');
      console.log(error);
    }
  };

  const editUser = (id: number) => {
    let user = getUsersList().find((item) => item.id == id);
    setSelectedUser(user);
    setModalOpen(true)
  }

  const modalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (id: number) => {
    if (confirm("Are you sure to delete this user?")) {
      try {
        setLoading(true);
        await deleteUser(Number(id));
        let data = getUsersList().filter(item => item.id != id);
        setUsers(data);
      } catch (err: any) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-4">Users Records</h1>
        <WithPermission permission="create_user">
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
        </WithPermission>
      </div>

      <hr className="my-3" /> <br />

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading users...</div>
      ) : (
        <div>
          <div>
            <Table
              columns={columns}
              data={tableData}
              {...((canEdit || canDelete) && {
                renderActions: (id: number) => (
                  <>
                    {canEdit && (
                      <button
                        type="button"
                        onClick={() => editUser(id)}
                        className="p-1 text-yellow-600 hover:text-yellow-800 cursor-pointer"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => handleDeleteUser(id)}
                        className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                  </>
                ),
              })}
            />
          </div>

          <BaseModal
            isOpen={modalOpen}
            onClose={modalClose}
            title={selectedUser ? "Edit User" : "Create User"}
          >
            <UserForm
              initialData={selectedUser}
              onCancel={modalClose}
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
