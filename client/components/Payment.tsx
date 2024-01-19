"use client";
import { useAppContext } from "@/contexts/AppContext";
import { Elements } from "@stripe/react-stripe-js";
import BookingForm from "@/components/Forms/BookingForm";
import { BookingDetails } from "@/types/props";
import { HotelType } from "@/types/mongoTypes";
import { PaymentIntentResponse } from "@/types/typings";
import { loadStripe } from "@stripe/stripe-js";
const STRIPE_PUB_KEY = process.env.NEXT_PUBLIC_STRIPE_PUB_KEY || "";
const stripePromise = loadStripe(STRIPE_PUB_KEY);
function Payment({
  hotel,
  paymentIntentData,
  bookingDetails,
}: {
  hotel: HotelType;
  paymentIntentData: PaymentIntentResponse;
  bookingDetails: BookingDetails;
}) {
  const { user } = useAppContext();
  return (
    <>
      {user ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            user={user}
            paymentIntent={paymentIntentData}
            hotelId={hotel._id}
            bookingDetails={bookingDetails}
          />
        </Elements>
      ) : null}
    </>
  );
}

export default Payment;
