import ManageAppliedModal from "../Pages/Dashboard/ManageAppliedModal";
import ManageFeedback from "../Pages/Dashboard/ManageFeedback";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { useState } from "react";

const AppliedScholarshipTable = ({ idx, info }) => {
  const queryClient = useQueryClient();
  const [activeDialog, setActiveDialog] = useState(null); // Track which dialog is open
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    university_name,
    scholarship_name,
    scholarship_category,
    subject,
    degree_name,
    service_charge,
    application_fees,
    status,
  } = info;

  // Update application status
  const { mutateAsync } = useMutation({
    mutationFn: async ({ _id, updatedStatus }) => {
      const { data } = await axiosSecure.patch(`/update-status/${_id}`, {
        updatedStatus,
      });
      console.log(data);
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        Swal.fire("Status updated successfully");
      }
      queryClient.invalidateQueries({ queryKey: ["applied-scholarship"] });
      queryClient.invalidateQueries({ queryKey: ["my-application"] });
    },
  });

  const handleUpdateStatus = (e) => {
    const updatedStatus = e.target.value;
    mutateAsync({ _id, updatedStatus });
  };

  // Mark as rejected
  const { mutateAsync: rejectedFunc } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.patch(`/reject/${_id}`);
      console.log("reject", data);
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Rejected",
          text: "Application Rejected Successfully.",
          icon: "success",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["applied-scholarship"] });
      queryClient.invalidateQueries({ queryKey: ["my-application"] });
    },
  });

  const handleRejected = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "After rejection, you cannot perform any other operations.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectedFunc(_id);
      }
    });
  };

  return (
    <>
      <tr className="text-sm border-black">
        <th>{idx + 1}</th>
        <td>{university_name}</td>
        <td>{scholarship_name}</td>
        <td>{scholarship_category}</td>
        <td>{subject}</td>
        <td>{degree_name}</td>
        <td>{application_fees}</td>
        <td>{service_charge}</td>
        <td>
          <select
            disabled={status === "Canceled" || status === "Rejected"}
            defaultValue={status}
            onChange={handleUpdateStatus}
            className={`${
              status === "Rejected"
                ? "border rounded-md border-red-600 bg-red-600 text-black"
                : "border rounded-md border-[#1E62D5] text-black"
            }`}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option disabled value="Canceled">
              Canceled
            </option>
            <option disabled value="Rejected">
              Rejected
            </option>
          </select>
        </td>
        <td className="flex justify-center items-center flex-col gap-1">
          <button
            onClick={() => setActiveDialog("details")}
            className="bg-primary text-white rounded-md px-2"
          >
            Details
          </button>
          <button
            disabled={status === "Canceled"}
            onClick={() => setActiveDialog("feedback")}
            className="bg-primary text-white rounded-md px-2 disabled:cursor-not-allowed"
          >
            Feedback
          </button>
          <button
            onClick={handleRejected}
            disabled={status === "Canceled" || status === "Rejected"}
            className={`${
              status === "Rejected"
                ? "bg-red-600 text-white rounded-md px-2 disabled:cursor-not-allowed"
                : ""
            }bg-primary text-white rounded-md px-2 disabled:cursor-not-allowed`}
          >
            {status === "Rejected"
              ? "Rejected"
              : status === "Canceled"
              ? "Canceled"
              : "Cancel"}
          </button>
        </td>
      </tr>

      {/* Dialogs moved outside of the table */}
      {activeDialog === "details" && (
        <dialog open className="modal">
          <ManageAppliedModal info={info} />
          <button onClick={() => setActiveDialog(null)} className="mt-2">
            Close
          </button>
        </dialog>
      )}
      {activeDialog === "feedback" && (
        <dialog open className="modal">
          <ManageFeedback id={_id} />
          <button onClick={() => setActiveDialog(null)} className="mt-2">
            Close
          </button>
        </dialog>
      )}
    </>
  );
};

AppliedScholarshipTable.propTypes = {
  info: PropTypes.object,
  idx: PropTypes.number,
};

export default AppliedScholarshipTable;