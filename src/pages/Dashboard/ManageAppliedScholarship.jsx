import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { RiseLoader } from "react-spinners";
import AppliedScholarshipTable from "../../component/AppliedScholarshipTable";
import useAppliedDate from "../../hooks/useAppliedDate";
import { Helmet } from "react-helmet-async";
const ManageAppliedScholarship = () => {
  const [deadline_date] = useAppliedDate();
  // console.log(deadline_date);
  const axiosSecure = useAxiosSecure();
  // const axiosPublic = useAxiosPublic();
  const [apply, setApply] = useState("");
  const [deadline, setDeadline] = useState("");
  // console.log(deadline);
  console.log(apply, deadline);
  const { data: applied_info, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/applied-scholarship?apply=${apply}&deadline=${deadline}`
      );
      return data;
    },
    queryKey: ["applied-scholarship", apply, deadline],
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader className="" color="#0000FF" />
      </div>
    );
  }

  console.log(applied_info);
  const uniqueDateApplied = [];
  applied_info?.forEach((date) => {
    const applied_date = date.apply_date;
    if (!uniqueDateApplied.includes(applied_date)) {
      uniqueDateApplied.push(applied_date);
    }
  });

  return (
    <div>
      <Helmet>
        <title>EduFunds | Dashboard applied scholarship</title>
      </Helmet>
      <div className="text-center">
        <h4 className="font-bold text-lg">Manage Applied Scholarship</h4>
        <h2 className="font-bold text-3xl font-cinzel text-primary">
          Manage All Applied Scholarship Data
        </h2>
      </div>
      <div className="my-5 flex justify-center gap-4">
        <select
          onChange={(e) => setApply(e.target.value)}
          defaultValue={apply}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">Applied Date</option>
          {uniqueDateApplied?.map((date, idx) => (
            <option value={date} key={idx}>
              {new Date(date).toLocaleDateString()}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setDeadline(e.target.value)}
          defaultValue={deadline}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">Deadline Date</option>
          {deadline_date?.map((date, idx) => (
            <option value={date} key={idx}>
              {new Date(date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="border bg-primary text-white font-bold">
              <tr>
                <th>Sl No</th>
                <th>University Name</th>
                <th>Scholarship Name</th>
                <th>Scholarship Category</th>
                <th>Subject Category</th>
                <th>Applied Degree</th>
                <th>Application Fees</th>
                <th>Service Charge</th>
                <th>Application Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {applied_info?.map((info, idx) => (
                <AppliedScholarshipTable
                  key={info._id}
                  idx={idx}
                  info={info}
                ></AppliedScholarshipTable>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAppliedScholarship;