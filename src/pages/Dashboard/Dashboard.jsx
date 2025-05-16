import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  FaHome,
  FaUser,
  FaPlus,
  FaClipboardList,
  FaUsers,
  FaStar,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();
  const { isAdminOrMod } = useAdmin();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false); // for small screen

  return (
    <div className="sm:drawer md:flex font-inter min-h-screen">
      <Helmet>
        <title>EduFunds | Dashboard</title>
      </Helmet>

     
      <div
        className={`transition-all duration-300 ease-in-out bg-primary text-white border-r ${
          isCollapsed ? "md:w-20" : "md:w-64"
        } w-full md:min-h-screen hidden md:block`}
      >
        <aside className="flex flex-col h-full px-4 py-4 overflow-y-auto">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="self-end mb-4 md:block hidden text-white"
          >
            {isCollapsed ? "➡️" : "⬅️"}
          </button>

          {!isCollapsed && (
            <div className="flex flex-col items-center mt-6 -mx-2">
              <img
                className="object-cover w-24 h-24 mx-2 rounded-full"
                src={user?.photoURL}
                alt="avatar"
              />
              <h4 className="mx-2 mt-2 font-medium">{user?.displayName}</h4>
              <p className="mx-2 mt-1 text-sm font-medium">{user?.email}</p>
            </div>
          )}

          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="flex flex-col space-y-5">
              {isAdminOrMod === "Admin" && (
                <>
                  <NavLink
                    to="admin-Home"
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg w-full font-medium flex items-center px-4 py-1 rounded-full bg-primary border-white border shadow-2xl text-white"
                        : ""
                    }
                  >
                    <span className="mx-4">
                      {isCollapsed ? <FaHome /> : "Admin Home"}
                    </span>
                  </NavLink>
                  <NavLink
                    to="add-scholarship"
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg font-bold w-full flex items-center px-4 py-1 rounded-full bg-primary border border-white text-white shadow-2xl"
                        : ""
                    }
                  >
                    <span className="mx-4">
                      {isCollapsed ? <FaPlus /> : "Add Scholarship"}
                    </span>
                  </NavLink>
                  <NavLink
                    to="manage-scholarship"
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg w-full font-medium flex items-center px-4 py-1 rounded-full bg-primary border border-white text-white shadow-2xl"
                        : ""
                    }
                  >
                    <span className="mx-4">
                      {isCollapsed ? <FaClipboardList /> : "Manage Scholarship"}
                    </span>
                  </NavLink>
                  <NavLink
                    to="manage-applications"
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg font-medium w-full flex items-center px-4 py-1 rounded-full bg-primary border border-white text-white shadow-2xl"
                        : ""
                    }
                  >
                    <span className="mx-4">
                      {isCollapsed ? <FaClipboardList /> : "Applied Scholarship"}
                    </span>
                  </NavLink>
                  <NavLink
                    to="all-user"
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg font-medium w-full flex items-center px-4 py-1 rounded-full bg-primary border border-white text-white shadow-2xl"
                        : ""
                    }
                  >
                    <span className="mx-4">
                      {isCollapsed ? <FaUsers /> : "All User"}
                    </span>
                  </NavLink>
                  <NavLink
                    to="all-review"
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg font-medium w-full flex items-center px-4 py-1 rounded-full bg-primary border border-white text-white shadow-2xl"
                        : ""
                    }
                  >
                    <span className="mx-4">
                      {isCollapsed ? <FaStar /> : "Manage Review"}
                    </span>
                  </NavLink>
                  <hr className="border-white border-b-2 w-full mt-5"></hr>
                </>
              )}

              {isAdminOrMod === "Moderator" && (
                <>
                  <NavLink
                    to="moderator-Home"
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg w-full font-medium flex items-center px-4 py-1 rounded-full bg-primary border border-white text-white"
                        : ""
                    }
                  >
                    <span className="mx-4">
                      {isCollapsed ? <FaHome /> : "Moderator Home"}
                    </span>
                  </NavLink>
                  <NavLink
                    to="add-scholarship"
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg font-bold w-full flex items-center px-4 py-1 rounded-full bg-primary border border-white text-white shadow-2xl"
                        : ""
                    }
                  >
                    <span className="mx-4">
                      {isCollapsed ? <FaPlus /> : "Add Scholarship"}
                    </span>
                  </NavLink>
                  <NavLink
                    to="manage-scholarship"
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg w-full font-medium flex items-center px-4 py-1 rounded-full bg-primary border border-white text-white shadow-2xl"
                        : ""
                    }
                  >
                    <span className="mx-4">
                      {isCollapsed ? <FaClipboardList /> : "Manage Scholarship"}
                    </span>
                  </NavLink>
                  <NavLink
                    to="manage-applications"
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg font-medium w-full flex items-center px-4 py-1 rounded-full bg-primary border border-white text-white shadow-2xl"
                        : ""
                    }
                  >
                    <span className="mx-4">
                      {isCollapsed ? <FaClipboardList /> : "Applied Scholarship"}
                    </span>
                  </NavLink>
                  <NavLink
                    to="all-review"
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg font-medium w-full flex items-center px-4 py-1 rounded-full bg-primary border border-white text-white shadow-2xl"
                        : ""
                    }
                  >
                    <span className="mx-4">
                      {isCollapsed ? <FaStar /> : "Manage Review"}
                    </span>
                  </NavLink>
                  <hr className="border-white border-b-2 w-full mt-5"></hr>
                </>
              )}

              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-lg font-medium w-full flex items-center px-4 py-1 rounded-full bg-primary border border-white shadow-2xl text-white"
                    : ""
                }
              >
                <span className="mx-4">
                  {isCollapsed ? <FaHome /> : "Home"}
                </span>
              </NavLink>
              <NavLink
                to="my-profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-lg font-medium w-full flex items-center px-4 py-1 rounded-full bg-primary border border-white shadow-2xl text-white"
                    : ""
                }
              >
                <span className="mx-4">
                  {isCollapsed ? <FaUser /> : "My Profile"}
                </span>
              </NavLink>

              {isAdminOrMod === "User" && (
                <>
                  <NavLink
                    to="my-application"
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg font-medium w-full flex items-center px-4 py-1 rounded-full bg-primary border border-white shadow-2xl text-white"
                        : ""
                    }
                  >
                    <span className="mx-4">
                      {isCollapsed ? <FaClipboardList /> : "My Applications"}
                    </span>
                  </NavLink>
                  <NavLink
                    to="my-reviews"
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg font-medium w-full flex items-center px-4 py-1 rounded-full bg-primary border border-white shadow-2xl text-white"
                        : ""
                    }
                  >
                    <span className="mx-4">
                      {isCollapsed ? <FaStar /> : "My Reviews"}
                    </span>
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </aside>
      </div>

     
      <div className="md:hidden bg-primary text-white px-4 py-3 relative">
        <button
          onClick={() => setIsTopbarOpen(!isTopbarOpen)}
          className="text-2xl"
        >
          {isTopbarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {isTopbarOpen && (
          <div className="mt-3 flex flex-col gap-4">
            <NavLink to="/" className="text-lg" onClick={() => setIsTopbarOpen(false)}>
              <FaHome className="inline mr-2" /> Home
            </NavLink>
            <NavLink to="my-profile" className="text-lg" onClick={() => setIsTopbarOpen(false)}>
              <FaUser className="inline mr-2" /> My Profile
            </NavLink>
            <NavLink to="add-scholarship" className="text-lg" onClick={() => setIsTopbarOpen(false)}>
              <FaPlus className="inline mr-2" /> Add Scholarship
            </NavLink>
            <NavLink to="manage-applications" className="text-lg" onClick={() => setIsTopbarOpen(false)}>
              <FaClipboardList className="inline mr-2" /> Applied Scholarship
            </NavLink>
            <NavLink to="all-user" className="text-lg" onClick={() => setIsTopbarOpen(false)}>
              <FaUsers className="inline mr-2" /> All Users
            </NavLink>
            <NavLink to="all-review" className="text-lg" onClick={() => setIsTopbarOpen(false)}>
              <FaStar className="inline mr-2" /> Manage Review
            </NavLink>
          </div>
        )}
      </div>

     
      <div className="p-6 sm:drawer-content flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;