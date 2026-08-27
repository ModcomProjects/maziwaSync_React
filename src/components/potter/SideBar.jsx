import { NavLink } from "react-router-dom";

const SideBar = ({ isOpen, setIsOpen }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-green-600 text-white"
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
          bg-gradient-to-br from-green-800 to-blue-900 text-white
          transform transition-transform duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-8">
            MaziwaSync
          </h2>

          <nav className="space-y-2">
            <NavLink to="/porter-dashboard" end className={linkClass}>
              <i className="bi bi-speedometer2"></i>
              Dashboard
            </NavLink>

            <NavLink to="/porter-dashboard/porter/collect-milk" className={linkClass}>
              <i className="bi bi-plus-circle"></i>
              Collect Milk
            </NavLink>

            <NavLink to="/porter-dashboard/porter/collections" className={linkClass}>
              <i className="bi bi-list-check"></i>
              My Collections
            </NavLink>

            <NavLink to="/porter-dashboard/porter/farmers" className={linkClass}>
              <i className="bi bi-people"></i>
              Assigned Farmers
            </NavLink>

            <NavLink to="/porter-dashboard/porter/notices" className={linkClass}>
              <i className="bi bi-megaphone"></i>
              Notices
            </NavLink>

            <NavLink to="/porter-dashboard/porter/profile" className={linkClass}>
              <i className="bi bi-person-circle"></i>
              Profile
            </NavLink>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideBar;