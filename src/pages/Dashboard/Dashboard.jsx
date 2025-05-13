import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Dashboard = () => {
  const { user } = useAuth();
  const { isAdminOrMod } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="font-inter flex min-h-screen bg-gray-100">
      <Helmet>
        <title>EduFunds | Dashboard</title>
      </Helmet>

      
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-primary text-white p-6 transition-transform duration-300 ease-in-out transform md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
       
        <div className="flex flex-col items-center mt-6 -mx-2">
          <img
            className="object-cover w-20 h-20 mx-2 rounded-full"
            src={user?.photoURL}
            alt="avatar"
          />
          <h4 className="mx-2 mt-2 font-medium">{user?.displayName}</h4>
          <p className="mx-2 mt-1 text-sm font-medium">{user?.email}</p>
        </div>

        
        <nav className="mt-8 flex flex-col space-y-4">
          {isAdminOrMod === "Admin" && (
            <>
              <DashboardLink to="admin-Home" label="Admin Home" />
              <DashboardLink to="add-scholarship" label="Add Scholarship" />
              <DashboardLink to="manage-scholarship" label="Manage Scholarship" />
              <DashboardLink to="manage-applications" label="Applied Scholarship" />
              <DashboardLink to="all-user" label="All User" />
              <DashboardLink to="all-review" label="Manage Review" />
              <hr className="border-white my-4" />
            </>
          )}

          {isAdminOrMod === "Moderator" && (
            <>
              <DashboardLink to="moderator-Home" label="Moderator Home" />
              <DashboardLink to="add-scholarship" label="Add Scholarship" />
              <DashboardLink to="manage-scholarship" label="Manage Scholarship" />
              <DashboardLink to="manage-applications" label="Applied Scholarship" />
              <DashboardLink to="all-review" label="Manage Review" />
              <hr className="border-white my-4" />
            </>
          )}

          <DashboardLink to="/" label="Home" />
          <DashboardLink to="my-profile" label="My Profile" />

          {isAdminOrMod === "User" && (
            <>
              <DashboardLink to="my-application" label="My Applications" />
              <DashboardLink to="my-reviews" label="My Reviews" />
            </>
          )}
        </nav>
      </aside>

     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

     
      <div className="flex-1 flex flex-col">
       
        <div className="bg-white shadow px-4 py-3 flex items-center justify-between md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary"
            aria-label="Toggle Sidebar"
          >
            {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
          <h2 className="text-lg font-semibold text-primary">Dashboard</h2>
        </div>

      
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const DashboardLink = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? "text-white font-semibold px-4 py-2 rounded-lg bg-white bg-opacity-20"
        : "text-white px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition"
    }
  >
    {label}
  </NavLink>
);

export default Dashboard;