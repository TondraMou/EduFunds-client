import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const UpdateReviewModal = ({id, review_comment, review_point }) => {
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  // post method

  const {mutateAsync} = useMutation({
    mutationFn: async ({id,update_review}) => {
      const { data } = await axiosSecure.patch(`/update-review/${id}`,update_review);
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount) {
        Swal.fire("update successfully");
        queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
        queryClient.invalidateQueries({ queryKey: ["all-reviews"] });
      }
    },
  });

  const onSubmit = async (update_review) => {
    if (update_review.review_point < 1 || update_review.review_point > 5) {
      setError("review must be 1-5 number");
      return;
    }
    console.log(update_review);
    mutateAsync({id,update_review})
  };
  return (
    <div className="modal-box">
      <div className="flex justify-end">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">Close</button>
        </form>
      </div>
      <div className="mt-5">
        <h2 className="text-3xl font-bold text-center text-[#247CFF]">
          Update Your Review
        </h2>
      </div>
      <div>
        <p className="text-center text-red-600 my-3">{error}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Review Point</span>
            </label>
            <input
              defaultValue={review_point}
              type="text"
              name="review_point"
              placeholder="input review out of 5.00"
              className="input input-bordered"
              required
              {...register("review_point")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Opinion</span>
            </label>
            <input
              defaultValue={review_comment}
              type="text"
              name="review_comment"
              placeholder="input your opinion"
              className="input input-bordered"
              required
              {...register("review_comment")}
            />
          </div>
          <button className="bg-[#247CFF] w-full mt-3 py-1 text-lg rounded-md text-white">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateReviewModal;