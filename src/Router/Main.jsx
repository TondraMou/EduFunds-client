import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../component/Shared/Navbar";
import Footer from "../component/Shared/Footer";

const Main = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="font-inter">
      {!isDashboard && <Navbar />}
      
      <div className={isDashboard ? "" : "md:max-w-screen-xl mx-auto"}>
        <Outlet />
      </div>

      {!isDashboard && <Footer />}
    </div>
  );
};

export default Main;
