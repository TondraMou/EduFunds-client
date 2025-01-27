import { FaEdit } from "react-icons/fa";
import { FaRegEye, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdateDataModal from "./UpdateDataModal";
import PropTypes from "prop-types";
import { useState } from "react";

const ScholarshipTable = ({ idx, item }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    scholarship_name,
    university_name,
    subject,
    application_fees,
    tuition_fees,
  } = item;

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosSecure.delete(`/all-scholarship/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-scholarship"] });
      queryClient.invalidateQueries({ queryKey: ["manage-scholarship"] });
    },
    mutationKey: ["delete-scholarship"],
  });

  // Delete confirmation
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
        mutateAsync({ id });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <tr className="even:bg-[#E8F6FC] text-base border-black">
        <th>{idx + 1}</th>
        <td>{scholarship_name}</td>
        <td>{university_name}</td>
        <td>{subject}</td>
        <td>{application_fees}</td>
        <td>{tuition_fees}</td>
        <td className="flex items-center gap-3">
          <Link to={`/scholarship-details/${_id}`}>
            <FaRegEye className="text-2xl cursor-pointer text-black rounded-md" />
          </Link>
          <FaEdit
            onClick={() => setIsDialogOpen(true)}
            className="text-2xl cursor-pointer text-black rounded-md"
          />
          <FaTrash
            onClick={() => handleDelete(_id)}
            className="text-2xl cursor-pointer text-red-600 rounded-md"
          />
        </td>
      </tr>

      {/* Move dialog outside of the table */}
      {isDialogOpen && (
        <dialog className="modal" open>
          <UpdateDataModal
            item={item}
            onClose={() => setIsDialogOpen(false)}
          ></UpdateDataModal>
          <button
            onClick={() => setIsDialogOpen(false)}
            className="absolute top-2 right-2 text-black font-bold"
          >
            X
          </button>
        </dialog>
      )}
    </>
  );
};

ScholarshipTable.propTypes = {
  item: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
};

export default ScholarshipTable;
