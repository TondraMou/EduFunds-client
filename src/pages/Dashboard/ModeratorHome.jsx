import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";

const ModeratorHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <Helmet>
        <title>EduFunds | Dashboard-Home</title>
      </Helmet>
      <div>
        <h4 className="text-lg font-bold font-cinzel text-[#247CFF]">
          Hi, {user?.displayName}
        </h4>
        <h2 className="text-4xl">Welcome to Moderator Dashboard</h2>
      </div>
    </div>
  );
};

export default ModeratorHome;