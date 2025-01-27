import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import UpdateMyApplication from "../Pages/MyApplication/UpdateMyApplication";
import ReviewModal from "../Pages/Dashboard/ReviewModal";
import PropTypes from "prop-types";

const MyApplicationTable = ({ idx, application }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    _id,
    university_name,
    university_city,
    university_country,
    subject,
    degree_name,
    service_charge,
    application_fees,
    status,
    feedback,
    scholarship_id,
  } = application;

  const handleStatus = () => {
    if (status === "Processing" || status === "Completed") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${
          status === "Processing"
            ? "You are unable to delete when application is processing"
            : ""
        } ${
          status === "Completed"
            ? "You are unable to delete when application is completed"
            : ""
        }`,
      });
      return;
    } else if (status === "Canceled" || status === "Rejected") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `You are unable to edit when application has been ${status}`,
      });
      return;
    }
  };

  // Cancel mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (_id) => {
      const { data } = await axiosSecure.patch(`/cancel/${_id}`);
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount) {
        Swal.fire({
          title: "Canceled",
          text: "Your scholarship was canceled successfully",
          icon: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["my-application"] });
        queryClient.invalidateQueries({ queryKey: ["applied-scholarship"] });
      }
    },
  });

  const handleStatusCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "After cancellation, we will close all processing on this scholarship.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateAsync(_id);
      }
    });
  };

  // Helper functions for opening and closing modals
  const showModal = (id) => {
    const modal = document.getElementById(id);
    modal.showModal();
    document.getElementById("root").setAttribute("inert", true); // Disable interaction with other content
    modal.querySelector("button").focus(); // Focus the first button or any element inside the dialog
  };

  const closeModal = (id) => {
    const modal = document.getElementById(id);
    modal.close();
    document.getElementById("root").removeAttribute("inert"); // Re-enable interaction with other content
  };

  return (
    <>
      <tr>
        <th>{idx + 1}</th>
        <td>{university_name}</td>
        <td className="text-center">
          {university_city}
          <br />
          {university_country}
        </td>
        <td>{subject}</td>
        <td>{degree_name}</td>
        <td>{application_fees}</td>
        <td>{service_charge}</td>
        <td>
          <span
            className={`${
              status === "Pending" || status === "Processing"
                ? "bg-primary text-white font-bold p-1 rounded-full"
                : ""
            } ${
              status === "Canceled" || status === "Rejected"
                ? "bg-red-600 text-white font-bold p-1 rounded-full"
                : ""
            }${
              status === "Completed"
                ? "bg-green-600 text-white font-bold p-1 rounded-full"
                : ""
            }`}
          >
            {status}
          </span>
        </td>
        <td>
          <button
            onClick={() => showModal(`feedback_${_id}`)}
            className="bg-primary text-white rounded-md px-2"
          >
            See feedback
          </button>
        </td>
        <td>
          <button
            onClick={() => showModal(`review_${_id}`)}
            className="bg-primary text-white rounded-md px-2"
          >
            Add review
          </button>
        </td>
        <td className="flex justify-center items-center flex-col gap-1">
          <Link to={`/scholarship-details/${scholarship_id}`}>
            <button className="bg-primary text-white rounded-md px-2">
              Details
            </button>
          </Link>
          <button
            onClick={() => {
              status === "Pending"
                ? showModal(`update_${_id}`)
                : handleStatus();
            }}
            className="bg-primary text-white rounded-md px-2 disabled:cursor-not-allowed"
          >
            Edit
          </button>
          <button
            disabled={status === "Canceled" || status === "Rejected"}
            onClick={handleStatusCancel}
            className={`bg-primary text-white rounded-md px-2 disabled:cursor-not-allowed ${
              status === "Rejected" && "bg-red-600 text-white rounded-md px-2"
            } ${status === "Canceled" && "bg-red-600 text-white rounded-md px-2"}`}
          >
            {status === "Rejected"
              ? "Rejected"
              : status === "Canceled"
              ? "Canceled"
              : "Cancel"}
          </button>
        </td>
      </tr>

      {/* Feedback Modal */}
      <dialog id={`feedback_${_id}`} className="modal">
        <div className="modal-box">
          <div className="flex justify-end">
            <form method="dialog">
              <button className="btn" onClick={() => closeModal(`feedback_${_id}`)}>Close</button>
            </form>
          </div>
          <div className="mt-5">
            <h2 className="text-center font-bold text-3xl text-[#247CFF]">
              See feedback
            </h2>
            <h4 className="mt-6 text-center text-2xl text-[#247CFF]">
              {feedback ? feedback : "No feedback was given."}
            </h4>
          </div>
        </div>
      </dialog>

      {/* Update Application Modal */}
      {status === "Pending" && (
        <dialog id={`update_${_id}`} className="modal">
          <UpdateMyApplication application={application}></UpdateMyApplication>
        </dialog>
      )}

      {/* Review Modal */}
      <dialog id={`review_${_id}`} className="modal">
        <ReviewModal application={application}></ReviewModal>
      </dialog>
    </>
  );
};

MyApplicationTable.propTypes = {
  application: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,  // Expecting idx to be a number
};

export default MyApplicationTable;