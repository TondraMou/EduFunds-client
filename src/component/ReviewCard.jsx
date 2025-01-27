import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
const ReviewCard = ({ review }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    _id,
    university_name,
    subject,
    applicant_name,
    post_date,
    review_point,
    review_comment,
  } = review;
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/all-reviews/${id}`);
      return data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
        queryClient.invalidateQueries({ queryKey: ["all-reviews"] });
      }
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateAsync(id);
      }
    });
  };

  return (
    <div className="card w-80 bg-base-100 border border-primary shadow-xl">
      <div className="flex flex-col p-4">
        <div>
          <h2 className="text-xl font-bold text-primary">
            University Name: {university_name}
          </h2>
          <p className="text-sm font-bold text-primary">Subject: {subject}</p>
          <hr className="border-primary my-3" />
        </div>
        <div>
          <h2 className="text-xl font-bold ">
            Reviewer Name: {applicant_name}
          </h2>
          <p className="text-sm font-bold">
            {new Date(post_date).toLocaleDateString()}
          </p>
          <p className="text-base">Rating Point: {review_point}</p>
          <p className="text-base">{review_comment}</p>
        </div>
        <div className="flex justify-end">
          <FaTrash
            onClick={() => handleDelete(_id)}
            className="text-2xl text-white bg-red-600 p-1 rounded-md cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
ReviewCard.propTypes = {
  review: PropTypes.object,
};
export default ReviewCard;