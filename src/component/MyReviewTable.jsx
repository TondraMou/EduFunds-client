import UpdateReviewModal from "./UpdateReviewModal";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
const MyReviewTable = ({ idx, review }) => {
  //   console.log(review);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    _id,
    scholarship_name,
    university_name,
    review_point,
    review_comment,
    post_date,
  } = review;

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/delete-review/${id}`);
      return data;
    },
    onSuccess: (data) => {
      if (data.deletedCount) {
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

  const handleDeleteReview = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert review!",
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
    <tr>
      <th>{idx + 1}</th>
      <td>{scholarship_name}</td>
      <td>{university_name}</td>
      <td>{review_point}</td>
      <td>{review_comment}</td>
      <td>{new Date(post_date).toLocaleDateString()}</td>
      <td className="flex flex-col items-center gap-2">
        <button
          onClick={() => document.getElementById(`edit_${_id}`).showModal()}
          className="bg-primary text-white rounded-md px-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteReview(_id)}
          className="bg-red-600 text-white rounded-md px-2"
        >
          Delete
        </button>
      </td>
      <dialog id={`edit_${_id}`} className="modal">
        <UpdateReviewModal
          id={_id}
          review_point={review_point}
          review_comment={review_comment}
        ></UpdateReviewModal>
      </dialog>
    </tr>
  );
};
MyReviewTable.propTypes = {
  review: PropTypes.object,
  idx: PropTypes.number,
};
export default MyReviewTable;