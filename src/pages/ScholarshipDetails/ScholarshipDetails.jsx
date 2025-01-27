import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { RiseLoader } from "react-spinners";
import ReviewSlider from "../../component/ReviewSlider";
import { Helmet } from "react-helmet-async";

const ScholarshipDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  // console.log(id)
  const { data: details, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-scholarship/${id}`);
      return data;
    },
    queryKey: ["details"],
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader className="" color="#890C25" />
      </div>
    );
  }
  console.log(details);
  const {
    application_fees,
    deadline,
    degree_name,
    post_date,
    scholarship_category,
    scholarship_name,
    service_charge,
    subject,
    tuition_fees,
    university_city,
    university_country,
    university_logo,
    university_name,
    university_rank,
    _id,
  } = details;
  return (
    <div className="mt-20 md:max-w-5xl mx-auto px-4">
      <Helmet>
        <title>EduFunds | Scholarship Details</title>
      </Helmet>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold font-cinzel text-primary">
          Scholarship Details
        </h2>
        <p className="font-bold text-3xl mt-2">{scholarship_name}</p>
      </div>

      {/* Scholarship Details */}
      <div className="flex flex-col md:flex-row md:gap-8 bg-base-100 text-primary border border-primary shadow-2xl rounded-lg overflow-hidden">
        <div className="flex justify-center items-center bg-gray-100 p-4">
          <img
            className="w-40 md:w-56"
            src={university_logo}
            alt={`${university_name} Logo`}
          />
        </div>
        <div className="flex-1 p-4">
          <h2 className="font-bold text-lg mb-2">
            University Name: {university_name}
          </h2>
          <p className="text-base font-bold mb-1">
            Location: {university_city}, {university_country}
          </p>
          <p className="text-base font-bold mb-1">
            University Rank: {university_rank}
          </p>
          <p className="text-base font-bold mb-1">Subject: {subject}</p>
          <p className="text-base font-bold mb-1">Degree: {degree_name}</p>
          <p className="text-base font-bold mb-1">
            Scholarship Category: {scholarship_category}
          </p>
          <p className="text-base font-bold mb-1">
            Tuition Fees: ${tuition_fees}
          </p>
          <p className="text-base font-bold mb-1">
            Application Fees: ${application_fees}
          </p>
          <p className="text-base font-bold mb-1">
            Service Charge: ${service_charge}
          </p>
          <p className="text-base font-bold mb-1">
            Posted Date: {new Date(post_date).toLocaleDateString()}
          </p>
          <div className="flex flex-col md:flex-row md:justify-between items-center mt-4">
            <p className="text-base font-bold mb-2 md:mb-0">
              Application Deadline: {new Date(deadline).toLocaleDateString()}
            </p>
            <Link
              to={`/checkout/${_id}`}
              className="text-white bg-primary px-4 py-2 rounded-md hover:rounded-2xl transition-all duration-300"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-10">
        <h2 className="text-center text-2xl font-bold font-cinzel text-primary underline">
          Review of this Scholarship
        </h2>
        <div className="mt-5">
          <ReviewSlider id={id}></ReviewSlider>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;