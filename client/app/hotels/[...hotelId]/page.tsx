import { AiFillStar } from "react-icons/ai";
import { GuestInfoForm } from "@/components";
import { fetchHotelByIdService } from "@/services/hotels";

type Props = {
  params: {
    hotelId: string;
  };
};
export default async function page({ params }: Props) {
  const hotel = await fetchHotelByIdService(params.hotelId);

  return (
    <main className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel?.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((image) => (
          <div className="h-[300px]" key={image.url}>
            <img
              src={image.url}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {hotel.facilities.map((facility) => (
          <div
            className="border border-slate-300 rounded-sm p-3"
            key={facility}
          >
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfoForm pricePerNight={hotel.pricePerNight} />
        </div>
      </div>
    </main>
  );
}
