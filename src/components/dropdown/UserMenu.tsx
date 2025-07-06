import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";


const UserMenu = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const authLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        logout();
        navigate("/");
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
                <span>👤 User</span>
                <span>▼</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        My Account
                    </button>
                    <button onClick={authLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
