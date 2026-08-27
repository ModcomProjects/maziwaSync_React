import { NavLink } from "react-router-dom";

const SideBar = ({ isOpen, setIsOpen }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-teal-600 text-white"
        : "text-gray-200 hover:bg-white/10"
    }`;

  return (
    <>
      {/* BACKDROP (mobile only) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-40"
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          top-0 left-0 h-full w-64
          bg-gradient-to-br from-green-900 to-teal-900 text-white
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-5 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-1">MaziwaSync</h2>
          <p className="text-teal-400 text-xs mb-8 uppercase tracking-widest font-semibold">
            Admin Panel
          </p>

          <nav className="space-y-1 flex-1">

            {/* Overview */}
            <p className="text-teal-400 text-xs uppercase tracking-widest px-4 mb-1">
              Overview
            </p>
            <NavLink to="/admin-dashboard" end className={linkClass}>
              <i className="bi bi-speedometer2"></i>
              Dashboard
            </NavLink>

            {/* People */}
            <p className="text-teal-400 text-xs uppercase tracking-widest px-4 mb-1 mt-4">
              People
            </p>
            <NavLink to="/admin-dashboard/farmers" className={linkClass}>
              <i className="bi bi-people"></i>
              Farmers
            </NavLink>
            <NavLink to="/admin-dashboard/balances" className={linkClass}>
              <i className="bi bi-wallet2"></i>
              Farmer Balances 
            </NavLink>
            <NavLink to="/admin-dashboard/porters" className={linkClass}>
              <i className="bi bi-person-badge"></i>
              Porters
            </NavLink>

            {/* Operations */}
            <p className="text-teal-400 text-xs uppercase tracking-widest px-4 mb-1 mt-4">
              Operations
            </p>
            <NavLink to="/admin-dashboard/collections" className={linkClass}>
              <i className="bi bi-droplet-half"></i>
              Milk Collections
            </NavLink>
            {/* <NavLink to="/admin-dashboard/pay-farmer" className={linkClass}>
              <i className="bi bi-cash-coin"></i>
              Pay Farmers
            </NavLink> */}

            {/* Communication */}
            <p className="text-teal-400 text-xs uppercase tracking-widest px-4 mb-1 mt-4">
              Communication
            </p>
            <NavLink to="/admin-dashboard/notices" className={linkClass}>
              <i className="bi bi-megaphone"></i>
              Notices
            </NavLink>

          </nav>

          {/* Bottom: Profile */}
          <div className="border-t border-white/20 pt-4 mt-4">
            <NavLink to="/admin-dashboard/profile" className={linkClass}>
              <i className="bi bi-person-gear"></i>
              Admin Profile
            </NavLink>
          </div>

        </div>
      </aside>
    </>
  );
};

export default SideBar;