import { BookingDetailsSummary, Payment } from "@/components";
import { BookingDetails } from "@/types/props";
import { createPaymentIntentService } from "@/services/payment";
import { defaultDateSSR } from "@/utils/getDefaultDate";
import { fetchHotelByIdService } from "@/services/hotels";
import { fetchCurrentUser } from "@/services/auth";
type Props = {
  params: {
    hotelId: string;
  };
  searchParams: {
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
  };
};
export default async function page({ params, searchParams }: Props) {
  const hotel = await fetchHotelByIdService(params.hotelId);
  const user = await fetchCurrentUser();
  const bookingDetails: BookingDetails = {
    checkIn: defaultDateSSR("checkIn", searchParams.checkIn),
    checkOut: defaultDateSSR("checkOut", searchParams.checkOut),
    adultCount: Number(searchParams.adultCount) || 1,
    childCount: Number(searchParams.checkOut) || 0,
  };

  const numberOfNights: number =
    Math.ceil(
      Math.abs(
        bookingDetails.checkOut.getTime() - bookingDetails.checkIn.getTime()
      ) /
        (1000 * 60 * 60 * 24)
    ) || 1;

  const paymentIntentData = await createPaymentIntentService(
    hotel._id,
    numberOfNights.toString()
  );

  return (
    <main className="grid md:grid-cols-[1fr_2fr] gap-4">
      <BookingDetailsSummary
        bookingDetails={bookingDetails}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      <Payment
        hotel={hotel}
        paymentIntentData={paymentIntentData}
        bookingDetails={bookingDetails}
        user={user}
      />
    </main>
  );
}
