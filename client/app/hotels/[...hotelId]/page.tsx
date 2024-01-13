"use client";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";
import { AiFillStar } from "react-icons/ai";
import { useAppContext } from "@/contexts/AppContext";
import { fetchHotelByIdService } from "@/services/hotels";
import { GuestInfoForm } from "@/components";

const page = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const { data } = useQuery(
    "fetchHotelById",
    () => fetchHotelByIdService(hotelId as string),
    {
      enabled: !!hotelId,
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  if (!data?.hotel) {
    return <span>You do not have any hotels yet</span>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: data?.hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{data.hotel.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {data.hotel.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image.url}
              alt={data.hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {data.hotel.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{data.hotel.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={data.hotel.pricePerNight}
            hotelId={data.hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
