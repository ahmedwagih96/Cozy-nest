"use client";
import { Elements } from "@stripe/react-stripe-js";
import BookingForm from "@/components/Forms/BookingForm";
import { BookingDetails } from "@/types/props";
import { HotelType, UserType } from "@/types/mongoTypes";
import { PaymentIntentResponse } from "@/types/typings";
import { loadStripe } from "@stripe/stripe-js";
const STRIPE_PUB_KEY = process.env.NEXT_PUBLIC_STRIPE_PUB_KEY || "";
const stripePromise = loadStripe(STRIPE_PUB_KEY);
function Payment({
  hotel,
  paymentIntentData,
  bookingDetails,
  user,
}: {
  hotel: HotelType;
  paymentIntentData: PaymentIntentResponse;
  bookingDetails: BookingDetails;
  user: UserType;
}) {
  return (
    <div>
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
    </div>
  );
}

export default Payment;
