import { EditHotel } from "@/components";
import { fetchMyHotelByIdService } from "@/services/serverSide";

type Props = {
  params: {
    hotelId: string;
  };
};

export default async function page({ params }: Props) {
  const hotel = await fetchMyHotelByIdService(params.hotelId);

  return (
    <main>
      <EditHotel hotel={hotel} />
    </main>
  );
}
