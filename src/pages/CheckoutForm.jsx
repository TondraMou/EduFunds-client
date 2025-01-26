import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const CheckoutForm = ({ scholarshipId, applicationFees, subjectCategory, scholarshipCategory, universityName }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  
    const handleSubmitPayment = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return; // Stripe.js has not loaded yet
      }
  
      setLoading(true);
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
  
      if (error) {
        toast.error(`Payment failed: ${error.message}`);
        setLoading(false);
        return;
      }
  
      const res = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          scholarshipId,
          applicationFees,
          subjectCategory, // Pass the subjectCategory
          scholarshipCategory, // Pass the scholarshipCategory
          universityName, // Pass the universityName
        }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        toast.success("Payment successful! Redirecting to the application form.");
        setPaymentSuccessful(true); // Proceed to application form
        navigate(`/application-form/${scholarshipId}`); // Redirect to ApplicationForm page
      } else {
        toast.error(`Payment failed: ${data.message}`);
      }
  
      setLoading(false);
    };
  
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmitPayment}>
          <h2 className="text-2xl font-semibold text-center mb-6">Apply for Scholarship</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Scholarship ID: {scholarshipId}</label>
            <p className="text-sm text-gray-600">University: {universityName}</p>
            <p className="text-sm text-gray-600">Application Fees: {applicationFees}</p>
            <p className="text-sm text-gray-600">Subject: {subjectCategory}</p>
            <p className="text-sm text-gray-600">Scholarship: {scholarshipCategory}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Card details</label>
            <CardElement className="mt-2 p-2 border rounded-md w-full" />
          </div>
          <button
            type="submit"
            disabled={loading || !stripe}
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay & Apply"}
          </button>
        </form>
      </div>
    );
  };
  
  export default CheckoutForm;