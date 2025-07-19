import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import Table from "@/components/ui/Table";
import type { Permission as PermissionType } from "@/types/user";
import { WithPermission } from "../../../components/hoc/WithPermission";
import { useHasPermission } from "../../../hooks/useHasPermission";
import { getPermissionsList, useUserStore } from "../../../store/userStore";
import BaseModal from "../../../components/modals/BaseModal";
import PermissionForm from "../../../components/forms/PermissionForm";
import { createPermission, updatePermission, deletePermission, getPermissions } from "../../../services/userApi";

const Permission: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<PermissionType | null>(null);
  const setPermissions = useUserStore((state) => state.setPermissions);

  const canEdit = useHasPermission("update_permission");
  const canDelete = useHasPermission("delete_permission");

  const columns = ["Name"];
  const tableData = getPermissionsList().map((permission) => ({
    id: permission.id,
    Name: permission.name
  }));
  useEffect(() => {
    fetchPermissionsPermissionsPermissions();
  }, []);

  const fetchPermissionsPermissionsPermissions = async () => {
    setLoading(true);
    try {
      const permissions = await getPermissions();
      setPermissions(permissions);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: PermissionType) => {
    try {
      if (selectedPermission?.id) {
        const permissionUpdate = await updatePermission(data, selectedPermission.id);
        let permissions: PermissionType[] = getPermissionsList();
        let mapPermissions = permissions.map((permission) =>
          permission.id === permissionUpdate.id ? permissionUpdate : permission
        );
        setPermissions(mapPermissions);
        setModalOpen(false);
      } else {
        const new_permission = await createPermission(data);
        const permissions: PermissionType[] = getPermissionsList();
        permissions.push(new_permission)
        setPermissions(permissions);
        setModalOpen(false);
      }
    } catch (error: any) {
      alert(error?.response?.data?.detail??'Something went wrong.');
      console.log(error);
    }
  };

  const editPermission = (id: number) => {
    let permission = getPermissionsList().find((item) => item.id == id);
    setSelectedPermission(permission);
    setModalOpen(true)
  }

  const handleDeletePermission = async (id: number) => {
    if (confirm("Are you sure to delete this permission?")) {
      try {
        setLoading(true);
        await deletePermission(Number(id));
        let data = getPermissionsList().filter(item => item.id != id);
        setPermissions(data);
      } catch (err: any) {
        console.error("Failed to load income", err);
      } finally {
        setLoading(false);
      }
    }
  };


  const modalClose = () => {
    setModalOpen(false);
    setSelectedPermission(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-4">Permissions Records</h1>
        <WithPermission permission="create_permission">
          <button
            type="button"
            className="w-auto px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer"
            onClick={() => {
              setSelectedPermission(null);
              setModalOpen(true);
            }}
          >
            Create Permission
          </button>
        </WithPermission>
      </div>

      <hr className="my-3" /> <br />

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading permissions...</div>
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
                        onClick={() => editPermission(id)}
                        className="p-1 text-yellow-600 hover:text-yellow-800 cursor-pointer"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => handleDeletePermission(id)}
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
            title={selectedPermission ? "Edit Permission" : "Create Permission"}
          >
            <PermissionForm
              initialData={selectedPermission}
              onCancel={modalClose}
              onSave={handleSave}
            />
          </BaseModal>
        </div>
      )}
    </div>
  );
};

export default Permission;