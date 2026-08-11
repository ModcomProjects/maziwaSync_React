import { NavLink } from "react-router-dom";

const SideBar = ({ isOpen, setIsOpen }) => {

  // =========================
  // ACTIVE LINK STYLE
  // =========================
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-green-600 text-white shadow-sm"
        : "text-gray-200 hover:bg-white/10"
    }`;

  return (
    <>
      {/* =========================
          MOBILE BACKDROP
      ========================= */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-40"
        />
      )}

      {/* =========================
          SIDEBAR CONTAINER
      ========================= */}
      <aside
        className={`
          fixed md:static z-50
          top-0 left-0 h-full w-64
          bg-gradient-to-br from-green-700 to-emerald-900 text-white
          transform transition-transform duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-5">

          {/* =========================
              BRAND
          ========================= */}
          <h2 className="text-2xl font-bold mb-8">
            MaziwaSync
          </h2>

          {/* =========================
              NAVIGATION
          ========================= */}
          <nav className="space-y-2">

            <NavLink to="/farmer-dashboard" end className={linkClass}>
              <i className="bi bi-speedometer2"></i>
              Dashboard
            </NavLink>

            <NavLink to="/farmer-dashboard/collections" className={linkClass}>
              <i className="bi bi-droplet"></i>
              My Milk Collections
            </NavLink>

            <NavLink to="/farmer-dashboard/feedback" className={linkClass}>
              <i className="bi bi-chat-dots"></i>
              Feedback
            </NavLink>

            <NavLink to="/farmer-dashboard/notices" className={linkClass}>
              <i className="bi bi-megaphone"></i>
              Notices
            </NavLink>

            <NavLink to="/farmer-dashboard/cattle-ai" className={linkClass}>
                <i className="bi bi-robot"></i>
                Cattle AI
            </NavLink>

            <NavLink to="/farmer-dashboard/profile" className={linkClass}>
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