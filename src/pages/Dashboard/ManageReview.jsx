import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { RiseLoader } from "react-spinners";
import ReviewCard from "../../component/ReviewCard";
import { Helmet } from "react-helmet-async";

const ManageReview = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-reviews");
      return data;
    },
    queryKey: ["all-reviews"],
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader className="" color="#890C25" />
      </div>
    );
  }
  console.log(reviews);
  return (
    <div>
      <Helmet>
        <title>EduFunds | Dashboard Manage-Review</title>
      </Helmet>
      <div className="text-center">
        <h4 className="font-bold text-lg">Manage Review</h4>
        <h2 className="font-bold text-3xl text-primary">
          Manage All Review Data
        </h2>
      </div>
      <div className="mt-5 grid md:grid-cols-3 gap-3">
        {reviews?.map((review) => (
          <ReviewCard key={review._id} review={review}></ReviewCard>
        ))}
      </div>
    </div>
  );
};

export default ManageReview;