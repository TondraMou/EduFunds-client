import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { RiseLoader } from "react-spinners";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: admin_chart, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-dashboard");
      return data;
    },
    queryKey: ["admin-chart"],
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader className="" color="#0000FF" />
      </div>
    );
  }

  const { application_count, totalFees, total_scholarship, total_user } =
    admin_chart;
  // console.log(application_count);

  const total_application = application_count.reduce(
    (total, app) => total + app.count,
    0
  );
  console.log(total_application);
  return (
    <div>
      <Helmet>
        <title>EduFunds | Dashboard-Home</title>
      </Helmet>
      <div>
        <h4 className="text-lg font-bold font-cinzel text-primary">
          Hi, {user?.displayName}
        </h4>
        <h2 className="text-4xl">Welcome to Admin Dashboard</h2>
      </div>
      <div>
        <div className="flex flex-col md:flex-row justify-between mt-5 text-xl font-bold text-primary">
          <h2>Total Scholarship:{total_scholarship}</h2>
          <h2>Total Application: {total_application}</h2>
          <h2>Total Application fees deposit: ${totalFees}</h2>
          <h2>Total User:{total_user}</h2>
        </div>
      </div>
      {/* chart */}

      {/* <ResponsiveContainer width="100%" height="100%"> */}

      <div className="my-10">
        <h2 className="text-center underline font-cinzel text-3xl text-primary font-bold">
          University-Wise Application Data
        </h2>
      </div>
      <div className="flex justify-center mt-10">
        <BarChart
          width={1500}
          height={400}
          // color="primary"
          data={application_count}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip shared={false} trigger="click" />
          {/* <Legend /> */}
          <Bar dataKey="count" fill="#ADD8E6" />
        </BarChart>
        {/* </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default AdminHome;