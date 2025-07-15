import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, {useState, useEffect} from "react";
import Table from "@/components/ui/Table";
import type { Role as RoleType, Permission } from "@/types/user";
import { WithPermission } from "../../../components/hoc/WithPermission";
import {  getPermissionsList, getRolesList, useUserStore } from "../../../store/userStore";
import BaseModal from "../../../components/modals/BaseModal";
import RoleForm from "../../../components/forms/RoleForm";
import {createRole, updateRole, deleteRole, getPermissions, getRoles } from "../../../services/userApi";

const Role: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const setRoles = useUserStore((state) => state.setRoles);
  const setPermissions = useUserStore((state) => state.setPermissions);
  const columns = ["Name", "Permission"];
  const tableData = getRolesList().map((role) => ({
    id: role.id,
    Name: role.name,
    Permission: role.permissions.length? role.permissions.map(r => r.name).join(", ") : 'No Permission Assigned.'
  }));
  useEffect(() => {
    fetchRolesRolesPermissions();
  }, []);

  const fetchRolesRolesPermissions = async () => {
    setLoading(true);
    try {
      const roles = await getRoles();
      const permissions = await getPermissions();
      setRoles(roles);
      setPermissions(permissions);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: RoleType) => {
    try {
      let permission_ids: number[] = [];
      data.permissions.forEach((permission: Permission) => {
        permission_ids.push(permission.id);
      });
      data.permission_ids = permission_ids;
      delete data.permissions;
      if(selectedRole?.id) {
        const roleUpdate = await updateRole(data, selectedRole.id);
        let roles: RoleType[] = getRolesList();
        let mapRoles = roles.map((role) =>
          role.id === roleUpdate.id ? roleUpdate : role
        );
        setRoles(mapRoles);
        setModalOpen(false);
      } else {
        const new_role = await createRole(data);
        const roles: RoleType[] = getRolesList();
        roles.push(new_role)
        setRoles(roles);
        setModalOpen(false);
      }
    } catch(error) {
      console.log(error);
    }
  };

  const editRole = (id: number) => {
    let role = getRolesList().find((item) => item.id == id);
    setSelectedRole(role);
    setModalOpen(true)
  }

  const modalClose = () => {
    setModalOpen(false);
    setSelectedRole(null);
  };

  const handleDeleteRole = async (id: number) => {
    if (confirm("Are you sure to delete this role?")) {
      try {
        setLoading(true);
        await deleteRole(Number(id));
        let data = getRolesList().filter(item => item.id != id);
        setRoles(data);
      } catch (err: any) {
        console.error("Failed to load role", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-4">Roles Records</h1>
        <button
          type="button"
          className="w-auto px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer"
          onClick={() => {
            setSelectedRole(null);
            setModalOpen(true);
          }}
        >
          Create Role
        </button>
      </div>

      <hr className="my-3" /> <br />

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading roles...</div>
      ) : (
        <div>
          <div>
            <Table
              columns={columns}
              data={tableData}
              renderActions={(id:number) => (
                <>
                  {/* <button
                    className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button> */}
                  <button
                    type="button"
                    onClick={() => editRole(id)}
                    className="p-1 text-yellow-600 hover:text-yellow-800 cursor-pointer"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <WithPermission permission="delete_user">
                    <button
                      onClick={() => handleDeleteRole(id)}
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
            onClose={modalClose}
            title={selectedRole ? "Edit Role" : "Create Role"}
          >
            <RoleForm
              initialData={selectedRole}
              onCancel={modalClose}
              onSave={handleSave}
              allPermissions={getPermissionsList()}
            />
          </BaseModal>
        </div>
      )}
    </div>
  );
};

export default Role;