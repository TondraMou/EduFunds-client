import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import coverImg from '../../../assets/cover.jpg';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const { user, loading, setUser } = useAuth(); // Destructuring setUser from useAuth
  const [role, isLoading] = useRole();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(user?.displayName);

  if (loading || isLoading) return <LoadingSpinner />;

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = { name: updatedName };

      // API call to update the profile
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`,
        updatedUser
      );

      console.log('Profile updated:', response.data);

      // Update the user context with the new name
      setUser((prevUser) => ({
        ...prevUser,
        displayName: updatedName,
      }));

      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="s:w-[75%] mx-auto flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
            />
          </a>
          {role !== 'user' && (
            <p className="p-2 px-4 text-xs text-white bg-lime-500 rounded-full">
              {role}
            </p>
          )}
          <p className="mt-2 text-xl font-medium text-gray-800">
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name
                {!isEditing ? (
                  <span className="font-bold text-black">{user?.displayName}</span>
                ) : (
                  <input
                    type="text"
                    className="border bg-white rounded p-1"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                )}
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black">{user?.email}</span>
              </p>
              <div>
                {!isEditing ? (
                  <button
                    className="bg-lime-500 px-10 py-1 rounded-lg text-black cursor-pointer hover:bg-lime-800 block mb-1"
                    onClick={() => setIsEditing(true)}
                  >
                    Update Profile
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-blue-800 block mb-1"
                    onClick={handleUpdateProfile}
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;