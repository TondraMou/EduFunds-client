import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { RiseLoader } from "react-spinners";
import { useState } from "react";
import ApplyScholarship from "../../component/ApplyScholarship";
import { Helmet } from "react-helmet-async";
// import React from "react";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Secret_key);
const Checkout = () => {
  const [toggleForm, setToggleForm] = useState();
  // console.log("toggle successfully", toggleForm);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  // console.log(id);
  const { data: scholarship_info, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-scholarship/${id}`);
      return data;
    },
    queryKey: ["scholarship-info"],
  });

  // console.log(scholarship_info)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader className="" color="#890C25" />
      </div>
    );
  }
  const {
    scholarship_name,
    university_name,
    subject,
    degree_name,
    scholarship_category,
    application_fees,
  } = scholarship_info;
  return (
    <div className="mt-20">
      <Helmet>
        <title>merit-matrix | Checkout</title>
      </Helmet>
      {toggleForm ? (
        <ApplyScholarship
          toggleForm={toggleForm}
          scholarship_info={scholarship_info}
        ></ApplyScholarship>
      ) : (
        <div className="md:max-w-xl mx-auto">
          <h2 className="text-center text-4xl font-bold text-primary">
            Payment
          </h2>
          <div className="mt-5 bg-primary text-white p-5 rounded-md border-2 border-white flex flex-col-reverse">
            {/* strip payment */}
            <div className="mt-5">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  setToggleForm={setToggleForm}
                  application_fees={application_fees}
                />
              </Elements>
            </div>
            <hr className="border-4 border-white w-full my-5" />
            {/* info */}
            <div className="">
              <h3 className="font-semibold text-lg">
                Scholarship_name: {scholarship_name}
              </h3>
              <h3 className="font-semibold text-lg">
                University_name: {university_name}
              </h3>
              <p className="font-semibold text-base">subject: {subject}</p>
              <p className="font-semibold text-base">subject: {degree_name}</p>
              <p className="font-semibold text-base">
                subject: {scholarship_category}
              </p>
              <h4 className="text-center mt-2 font-bold text-lg">
                Please Pay application fees: ${application_fees}
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;