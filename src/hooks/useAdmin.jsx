
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosPublic= useAxiosSecure();

  const { data: isAdminOrMod, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/users/adminOrMod/${user.email}`);
    //   console.log("use admin", data);
      return data?.isAdminOrMod;
    },
    queryKey: ["isAdmin", user?.email],
  });
  return { isAdminOrMod,isLoading };
};

export default useAdmin;