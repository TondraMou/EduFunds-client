import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ application_fees, setToggleForm }) => {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  // console.log(application_fees)
  useEffect(() => {
    const sendFees = async () => {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        application_fees: application_fees,
      });
      console.log(data.clientSecret);
      setClientSecret(data.clientSecret);
    };
    sendFees();
  }, [axiosSecure]);
  // payment func
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    // error
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
          card: card,
          billing_details: {
              email: user?.email || 'anonymous',
              name: user?.displayName || 'anonymous'
          }
      }
  })
    if (confirmError) {
      console.log("confirm error");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${confirmError}`,
      });
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status == "succeeded") {
        setToggleForm(paymentIntent.id);
        Swal.fire({
          title: "Payment Successful",
          text: `Transaction id is: ${paymentIntent.id}`,
          icon: "success",
        });
      }
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "20px",
              color: "#424770",
              height: "90px",
              "::placeholder": {
                color: "#1EA9E4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      <button
        className="bg-[#1E62D5] py-2 px-3 mt-5 rounded-md text-white text-xl w-full disabled:cursor-not-allowed"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;