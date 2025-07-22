import { FaBars, FaTimes } from "react-icons/fa";

function Nav({ isSidebarOpen, toggleSidebar }) {
  return (
    <nav className="w-full bg-gradient-to-r from-emerald-100 via-blue-50 to-blue-100 shadow-sm px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 relative z-10">
      
      {/* Toggle Sidebar Button (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="absolute left-4 top-4 md:hidden text-gray-800 bg-white hover:bg-gray-200 p-2 rounded-lg shadow-md"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Title */}
      <div className="text-2xl font-bold text-gray-800 text-center md:text-left w-full md:w-auto">
        📊 Dashboard
      </div>

      {/* Right Section: Search + Avatar */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-64 px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* Profile Avatar */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring-2 ring-blue-400 ring-offset-2">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
