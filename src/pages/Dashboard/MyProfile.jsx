import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import { Helmet } from "react-helmet-async";

const MyProfile = () => {
  const { isAdminOrMod } = useAdmin();
  const { user } = useAuth();
  return (
    <div className="md:max-w-xl mx-auto bg-base-100 border border-primary rounded-lg p-8 shadow-lg">
      <Helmet>
        <title>EduFunds | Profile</title>
      </Helmet>
      <div className="text-center font-bold text-4xl text-primary mb-6">
        <h2 className="font-cinzel">My Profile</h2>
      </div>
      <div className="flex flex-col items-center justify-center space-y-10">
        <div className="text-center">
          <h2 className="font-semibold text-2xl text-primary mb-4">
            Profile Photo
          </h2>
          <img
            className="object-cover w-28 h-28 rounded-full border-2 border-primary shadow-md"
            src={user?.photoURL}
            alt="User Avatar"
          />
        </div>
        <div className="w-full text-center space-y-6">
          <div>
            <h2 className="font-semibold text-2xl text-primary mb-2">Name</h2>
            <p className="text-lg text-gray-700">
              {user?.displayName || "Not Provided"}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-2xl text-primary mb-2">Email</h2>
            <p className="text-lg text-gray-700">
              {user?.email || "Not Provided"}
            </p>
          </div>
          {isAdminOrMod === "Admin" || isAdminOrMod === "Moderator" ? (
            <div>
              <h2 className="font-semibold text-2xl text-primary mb-2">Role</h2>
              <p className="text-lg font-bold text-green-600">{isAdminOrMod}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;