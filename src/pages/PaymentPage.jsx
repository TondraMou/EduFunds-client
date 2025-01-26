import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const PaymentPage = ({ scholarshipId, applicationFees, universityName, subjectCategory, scholarshipCategory}) => {
    return (
        <div>
            
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm scholarshipId={scholarshipId} applicationFees={applicationFees}  universityName={universityName} 
  subjectCategory={subjectCategory} 
  scholarshipCategory={scholarshipCategory} ></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default PaymentPage;