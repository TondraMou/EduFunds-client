import { RiseLoader } from "react-spinners";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const AdminAndModeratorRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const { isAdminOrMod, isLoading } = useAdmin();
  const adminAndModerator =
    isAdminOrMod === "Admin" || isAdminOrMod === "Moderator";
  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader className="" color="#0000FF" />
      </div>
    );
  }
  if (user && adminAndModerator) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default AdminAndModeratorRoute;