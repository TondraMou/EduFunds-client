import Container from '../Container'; 
import { AiOutlineMenu } from 'react-icons/ai'; 
import { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold">
              EduFunds
            </Link>

            {/* Navbar Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="font-semibold hover:text-gray-700 transition">
                Home
              </Link>
              <Link to="/all-scholarship" className="font-semibold hover:text-gray-700 transition">
                All Scholarships
              </Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="font-semibold hover:text-gray-700 transition">
                    Dashboard
                  </Link>
                  <div
                    onClick={logOut}
                    className="font-semibold hover:text-gray-700 cursor-pointer"
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="font-semibold hover:text-gray-700 transition">
                    Login
                  </Link>
                  <Link to="/signup" className="font-semibold hover:text-gray-700 transition">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 border-[1px] border-neutral-200 flex items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu />
              </div>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-16 right-0 bg-white shadow-md rounded-lg w-64 z-20">
              <div className="flex flex-col cursor-pointer">
                <Link
                  to="/"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Home
                </Link>
                <Link
                  to="/all-scholarship"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  All Scholarships
                </Link>
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Dashboard
                    </Link>
                    <div
                      onClick={logOut}
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Navbar;