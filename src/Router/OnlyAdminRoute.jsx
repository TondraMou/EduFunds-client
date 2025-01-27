import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { RiseLoader } from "react-spinners";

const OnlyAdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const { isAdminOrMod, isLoading } = useAdmin();
  const admin = isAdminOrMod === "Admin";
  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader className="" color="#890C25" />
      </div>
    );
  }
  if (user && admin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default OnlyAdminRoute;