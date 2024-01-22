import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useMutation } from "react-query";
import { BookingData, PaymentIntentResponse } from "@/types/typings";
import { BookingDetails } from "@/types/props";
import { createRoomBookingService } from "@/services/booking";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
function useMakeBooking(
  paymentIntent: PaymentIntentResponse,
  bookingDetails: BookingDetails,
  hotelId: string
) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const { mutate: bookRoom, isLoading } = useMutation(
    createRoomBookingService,
    {
      onSuccess: () => {
        toast.success("Booking Saved");
        router.push("/my-bookings");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      const data: BookingData = {
        bookingDetails,
        totalCost: paymentIntent.totalCost,
        paymentIntentId: result.paymentIntent.id,
        hotelId,
      };
      bookRoom(data);
    }
  };
  return { handleSubmit, isLoading };
}

export default useMakeBooking;
