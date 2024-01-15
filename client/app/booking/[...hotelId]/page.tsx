"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import { useAppContext } from "@/contexts/AppContext";
import { Elements } from "@stripe/react-stripe-js";
import { BookingDetailsSummary } from "@/components";
import BookingForm from "@/components/Forms/BookingForm";
import useFetchHotel from "@/hooks/useFetchHotel";
import { BookingDetails } from "@/types/props";
import { createPaymentIntentService } from "@/services/payment";
const Booking = () => {
  const params = useSearchParams();
  const { user, stripePromise } = useAppContext();
  const { hotelData, isLoading, isFetchHotelError, fetchHotelError } =
    useFetchHotel();
  const { hotelId } = useParams();

  const bookingDetails: BookingDetails = {
    checkIn: new Date(params.get("checkIn") as string) || new Date(),
    checkOut: new Date(params.get("checkOut") as string) || new Date(),
    childCount: Number(params.get("childCount")) || 1,
    adultCount: Number(params.get("adultCount")) || 0,
  };

  const numberOfNights: number =
    Math.ceil(
      Math.abs(
        bookingDetails.checkOut.getTime() - bookingDetails.checkIn.getTime()
      ) /
        (1000 * 60 * 60 * 24)
    ) || 1;

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      createPaymentIntentService(hotelId as string, numberOfNights.toString()),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotelData?.hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4">
      <BookingDetailsSummary
        bookingDetails={bookingDetails}
        numberOfNights={numberOfNights}
        hotel={hotelData.hotel}
      />
      {user && paymentIntentData ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            user={user}
            paymentIntent={paymentIntentData}
            hotelId={hotelData.hotel._id}
            bookingDetails={bookingDetails}
          />
        </Elements>
      ) : null}
    </div>
  );
};

export default Booking;
