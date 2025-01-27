import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaXmark } from "react-icons/fa6";

const ManageFeedback = ({ id }) => {
  const axiosSecure = useAxiosSecure();
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, feedback }) => {
      const { data } = await axiosSecure.patch(`/send-feedback/${id}`, {
        feedback,
      });
      
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        Swal.fire("send feedback successfully");
      }
      
    },
  });
  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    console.log("feedback", feedback);
    mutateAsync({ id, feedback });
  };
  return (
    <div className="modal-box md:max-w-2xl">
      <div className="flex justify-end">
       <form method="dialog">
                 <button
                   className="text-xl p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition duration-200"
                   aria-label="Close Modal"
                 >
                   <FaXmark />
                 </button>
               </form>
      </div>
      <div className="mt-5">
        <h2 className="font-bold text-3xl text-center text-primary">
          Submit feedback for this application
        </h2>
      </div>
      <div className="mt-4">
        <form
          onSubmit={handleSubmitFeedback}
          className="flex flex-col items-center justify-center"
        >
          <div>
            <textarea
              name="feedback"
              placeholder="submit a feed back"
              className="input input-bordered"
              rows={10}
              cols={30}
              id=""
            ></textarea>
          </div>
          <button className="text-center bg-primary text-white px-3 py-2 text-base rounded-md mt-2 hover:rounded-2xl duration-300 translate-all">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
ManageFeedback.propTypes = {
  id: PropTypes.string,
};
export default ManageFeedback;