import { useContext, useEffect, useState } from "react";
import axios from "axios";
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
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../store/userSlice";

const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(true);
  let { isOpen, setIsOpen, BACKEND_URL } = useContext(UserContext);
  let currentUser = useSelector((store) => store.user.currentUser);
  let dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard" },
    { icon: <FaUserEdit />, label: "Update Profile" },
    { icon: <FaArrowDown />, label: "Credit Amount" },
    { icon: <FaArrowUp />, label: "Debit Amount" },
    { icon: <FaExchangeAlt />, label: "Transfer Amount" },
    { icon: <FaHandHoldingUsd />, label: "Take Loan" },
  ];

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v2/logout`,
        {}, // body is empty
        { withCredentials: true } // proper placement
      );
      // console.log("Logout Success:", res.data.message);
      toast.success(res.data.message);
      dispatch(setCurrentUser(null));
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
      dispatch(setCurrentUser(null));
    }
  };

  useEffect(() => {
    console.log(currentUser);
  }, []);
  return (
    <>
      {/* Toggle Button - Mobile Only */}
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
        className={`fixed md:relative top-0 left-0 h-full md:h-screen w-[320px] bg-gradient-to-b from-emerald-100 via-blue-50 to-blue-100 border-r border-gray-200 z-40 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col justify-between`}
      >
        {/* Top Section */}
        <div>
          <div className="p-6">
            <h1 className="text-2xl font-bold tracking-wide text-gray-900 text-center mb-4">
              BB Bank
            </h1>
            <div className="flex justify-center mb-2">
              <img
                src={currentUser?.photoUrl}
                alt="Profile"
                className="w-[150px] h-[150px] rounded-full object-cover border-4 border-emerald-500 shadow-lg"
              />
            </div>
            <p className="text-center text-base font-semibold text-gray-800">
              {currentUser?.fullName}
            </p>
          </div>

          {/* Menu List */}
          <div className="px-6 pb-6 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-blue-300">
            {menuItems.map(({ icon, label }) => (
              <SidebarButton
                key={label}
                icon={icon}
                label={label}
                active={activeTab === label}
                onClick={() => setActiveTab(label)}
              />
            ))}
          </div>
        </div>

        {/* Logout Button - Bottom */}
        <div className="p-6">
          <button
            className="flex items-center gap-3 w-full px-5 py-3 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition font-semibold text-sm"
            onClick={handleLogout}
          >
            <FaSignOutAlt size={18} />
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
      className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-200
        ${
          active
            ? "bg-gradient-to-r from-emerald-400 to-blue-400 text-white shadow-md"
            : "text-gray-700 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-blue-400 hover:text-white"
        }
        font-medium text-sm`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default Sidebar;
