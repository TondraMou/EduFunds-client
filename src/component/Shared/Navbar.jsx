import { Link, NavLink } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
  const { isAdminOrMod } = useAdmin();
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLinkClick = () => {
    // Close dropdown on mobile when a nav item is clicked
    setIsDropdownOpen(false);
  };

  const navLins = (
    <>
      <NavLink
        onClick={handleLinkClick}
        className={({ isActive }) =>
          isActive ? "text-lg font-bold underline " : "text-lg"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        onClick={handleLinkClick}
        className={({ isActive }) =>
          isActive ? "text-lg font-bold underline " : "text-lg"
        }
        to="/all-scholarship"
      >
        All Scholarship
      </NavLink>
      <NavLink
        onClick={handleLinkClick}
        className={({ isActive }) =>
          isActive ? "text-lg font-bold underline " : "text-lg"
        }
        to="/about"
      >
        About
      </NavLink>
      <NavLink
        onClick={handleLinkClick}
        className={({ isActive }) =>
          isActive ? "text-lg font-bold underline " : "text-lg"
        }
        to="/contact"
      >
        Contact
      </NavLink>

      {isAdminOrMod === "Admin" && (
        <NavLink
          onClick={handleLinkClick}
          className={({ isActive }) =>
            isActive ? "text-lg font-bold underline text-[#0089F7]" : "text-lg"
          }
          to="/dashboard/admin-Home"
        >
          Dashboard
        </NavLink>
      )}
      {isAdminOrMod === "Moderator" && (
        <NavLink
          onClick={handleLinkClick}
          className={({ isActive }) =>
            isActive ? "text-lg font-bold underline text-[#0089F7]" : "text-lg"
          }
          to="/dashboard/moderator-Home"
        >
          Dashboard
        </NavLink>
      )}
      {isAdminOrMod === "User" && (
        <NavLink
          onClick={handleLinkClick}
          className={({ isActive }) =>
            isActive ? "text-lg font-bold underline text-[#0089F7]" : "text-lg"
          }
          to="/dashboard/my-application"
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="w-full mx-auto bg-slate-50 text-blue-600 justify-between md:px-5 shadow-xl sticky top-0 z-50 h-20 flex items-center px-4">
      <div className="flex items-center gap-2">
        <div className="dropdown">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <ul
              className="menu menu-sm dropdown-content absolute mt-3 z-10 p-2 shadow bg-primary rounded-box w-52 text-white"
            >
              {navLins}
            </ul>
          )}
        </div>
        <Link to="/" className="flex items-center md:gap-3 gap-1">
          <h2 className="font-Madimi-One font-bold text-lg md:text-2xl">
            EduFunds
          </h2>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5 items-center">{navLins}</ul>
        </div>

        {user ? (
          <div className="dropdown dropdown-end z-10">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle border-2 border-white avatar "
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52"
            >
              <li className="text-center font-bold">
                <h3 className="flex justify-center text-base text-white mb-3">
                  {user?.displayName}
                </h3>
              </li>

              <li className="border-b-2 border-[#1EA9E4] hover:border-2 hover:rounded-md"></li>

              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="bg-white text-black text-center hover:border-2 flex items-center gap-2 justify-center"
                >
                  Logout <IoLogOutOutline />
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="">
            <NavLink
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive
                  ? "text-xs md:text-lg font-bold underline "
                  : "text-xs md:text-lg"
              }
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive
                  ? "text-lg text-black border-2 rounded-full md:p-2 border-background-Primary bg-background-Primary ml-6"
                  : "text-black text-xs md:text-lg border-2 rounded-full md:p-2 p-1 border-background-Primary bg-background-Primary md:ml-6 ml-2"
              }
              to="/register"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;