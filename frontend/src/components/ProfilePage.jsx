import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserEdit,
  FaArrowDown,
  FaArrowUp,
  FaExchangeAlt,
  FaHandHoldingUsd,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { UserContext } from "../context/userContext";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../store/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, setIsOpen, BACKEND_URL } = useContext(UserContext);
  const currentUser = useSelector((store) => store.user.currentUser);
  const dispatch = useDispatch();

  const getLabelFromPath = (path) => {
    if (path === "/home") return "Dashboard";
    if (path.includes("update")) return "Update Profile";
    if (path.includes("credit")) return "Credit Amount";
    if (path.includes("debit")) return "Debit Amount";
    if (path.includes("transfer")) return "Transfer Amount";
    if (path.includes("loan")) return "Take Loan";
    return "";
  };

  const [activeTab, setActiveTab] = useState(getLabelFromPath(location.pathname));

  useEffect(() => {
    setActiveTab(getLabelFromPath(location.pathname));
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (path, label) => {
    setActiveTab(label);
    navigate(path);
    if (window.innerWidth < 768) {
      setIsOpen(false); // ✅ Auto close on mobile
    }
  };

  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/home" },
    { icon: <FaUserEdit />, label: "Update Profile", path: "/home/update" },
    { icon: <FaArrowDown />, label: "Credit Amount", path: "/home/credit" },
    { icon: <FaArrowUp />, label: "Debit Amount", path: "/home/debit" },
    { icon: <FaExchangeAlt />, label: "Transfer Amount", path: "/home/transfer" },
    { icon: <FaHandHoldingUsd />, label: "Take Loan", path: "/home/loan" },
  ];

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v2/logout`, {}, { withCredentials: true });
      toast.success(res.data.message);
      dispatch(setCurrentUser(null));
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
      dispatch(setCurrentUser(null));
      navigate("/login");
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="absolute top-4 left-4 z-50 md:hidden">
        <button
          onClick={toggleSidebar}
          className="text-gray-800 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-full w-[320px] bg-gradient-to-b from-emerald-50 via-blue-50 to-blue-100 border-r border-gray-200 z-40 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col justify-between`}
      >
        {/* Top Section */}
        <div>
          <div className="px-6 pt-5 pb-3">
            <h1 className="text-2xl text-center text-emerald-700 font-medium tracking-wider">
              BB Bank of India
            </h1>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center justify-center mb-4">
            <img
              src={currentUser?.photoUrl}
              alt="Profile"
              className="w-[140px] h-[140px] rounded-full border-4 border-emerald-400 shadow-sm object-cover"
            />
            <p className="mt-2 text-sm text-gray-800 font-medium">
              {currentUser?.fullName}
            </p>
          </div>

          {/* Menu Items */}
          <div className="px-4 pb-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200">
            {menuItems.map(({ icon, label, path }) => (
              <SidebarButton
                key={label}
                icon={icon}
                label={label}
                active={activeTab === label}
                onClick={() => handleItemClick(path, label)}
              />
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm font-normal"
          >
            <FaSignOutAlt size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

// Sidebar Button Component
function SidebarButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 text-sm font-normal ${
        active
          ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-sm"
          : "text-gray-700 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-blue-400 hover:text-white"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default Sidebar;
