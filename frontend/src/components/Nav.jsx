import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

function Nav({ isSidebarOpen, toggleSidebar }) {
  
  // Getting Data For User Image
  let currentUser = useSelector((store) => store.user.currentUser);

  return (
    <nav className="w-full bg-gradient-to-r from-emerald-100 via-blue-50 to-blue-100 shadow-sm px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 relative z-10">
      {/* Toggle Sidebar Button*/}
      <button
        onClick={toggleSidebar}
        className="absolute left-4 top-4 md:hidden text-gray-800 bg-white hover:bg-gray-200 p-2 rounded-lg shadow-md"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Title */}
      <div className="text-2xl  text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-center md:text-left w-full md:w-auto font-semibold">
        DASHBOARD
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
        {/* Profile Avatar */}
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full ring-2 ring-blue-400 ring-offset-2">
            <img alt="User Avatar" src={currentUser.photoUrl} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
