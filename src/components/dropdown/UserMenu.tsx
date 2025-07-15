import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, getAuthUserInformation } from "../../store/authStore";
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const UserMenu = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const authLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        logout();
        navigate("/");
    };

    const handleRoute = () => {
        setOpen(false);
        navigate("/dashboard/my-account");
    }


    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
            >
                <span>👤 { getAuthUserInformation()?.name }</span>
                <span>{ open? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                    <button onClick={handleRoute} type="button" className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        My Account
                    </button>
                    <button type="button" onClick={authLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
