import { getAuthUserInformation } from "../../../store/authStore";

const UserProfile = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
        <hr className="mb-5 mt-0" />
        <div className="space-y-4">
          <div className="flex flex-row gap-2">
            <p className="text-md text-gray-500">Name:</p>
            <p className="text-md font-medium text-gray-900">{getAuthUserInformation()?.name }</p>
          </div>

          <div className="flex flex-row gap-2">
            <p className="text-md text-gray-500">Email:</p>
            <p className="text-md font-medium text-gray-900">{getAuthUserInformation()?.email}</p>
          </div>

          {getAuthUserInformation()?.roles && (
            <div className="flex flex-row gap-2">
              <p className="text-md text-gray-500">Role:</p>
              {
                getAuthUserInformation()?.roles.length? getAuthUserInformation()?.roles.map((r: any) => r.name).join(", ") : 'No Role Assigned.'
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
