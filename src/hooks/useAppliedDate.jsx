import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAppliedDate = () => {
  const axiosPublic = useAxiosPublic();
  const { data: scholarship } = useQuery({
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-scholarship-admin");
      return data;
    },
    queryKey: ["manage-scholarship-date"],
  });

  console.log("scholarship", scholarship);

  const deadline_date = [];

  scholarship?.forEach((date) => {
    const check_deadline = date.deadline;
    if (!deadline_date.includes(check_deadline)) {
      deadline_date.push(check_deadline);
    }
  });
  return [deadline_date];
};

export default useAppliedDate;