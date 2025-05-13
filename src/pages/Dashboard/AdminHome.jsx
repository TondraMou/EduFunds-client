import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { RiseLoader } from "react-spinners";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaUserGraduate,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: admin_chart, isLoading, isError } = useQuery({
    queryKey: ["admin-chart"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-dashboard");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader color="#2563EB" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-20 text-xl">
        Failed to load admin dashboard data.
      </div>
    );
  }

  const {
    application_count = [],
    totalFees = 0,
    total_scholarship = 0,
    total_user = 0,
  } = admin_chart;

  const total_application = application_count.reduce(
    (total, app) => total + app.count,
    0
  );

  return (
    <div className="p-4 md:p-6">
      <Helmet>
        <title>EduFunds | Admin Dashboard</title>
      </Helmet>

      <div className="mb-6">
        <h4 className="text-lg font-bold text-primary font-cinzel">
          Hi, {user?.displayName}
        </h4>
        <h2 className="text-3xl md:text-4xl font-semibold mt-1">
          Welcome to Admin Dashboard
        </h2>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        <StatCard
          icon={<FaUserGraduate size={28} />}
          label="Total Scholarships"
          value={total_scholarship}
          bg="bg-blue-100"
        />
        <StatCard
          icon={<FaClipboardList size={28} />}
          label="Total Applications"
          value={total_application}
          bg="bg-green-100"
        />
        <StatCard
          icon={<FaMoneyCheckAlt size={28} />}
          label="Fees Deposited"
          value={`$${totalFees}`}
          bg="bg-yellow-100"
        />
        <StatCard
          icon={<FaUsers size={28} />}
          label="Total Users"
          value={total_user}
          bg="bg-pink-100"
        />
      </div>

     
      <div className="my-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary font-cinzel underline">
          University-Wise Application Data
        </h2>

        <div className="w-full h-[400px] mt-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={application_count}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#60A5FA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};


const StatCard = ({ icon, label, value, bg }) => (
  <div
    className={`rounded-xl shadow-md p-5 flex items-center space-x-4 ${bg}`}
  >
    <div className="text-primary">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold">{value}</h3>
      <p className="text-sm text-gray-700">{label}</p>
    </div>
  </div>
);

export default AdminHome;