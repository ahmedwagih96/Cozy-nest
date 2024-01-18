"use client";
import { AiFillStar } from "react-icons/ai";
import { GuestInfoForm } from "@/components";
import useFetchHotel from "@/hooks/useFetchHotel";

const page = () => {
  const { hotel, isLoading, isError, error } =
    useFetchHotel();

  return (
    <main className="space-y-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : !hotel ? (
        <p>No Hotel Found</p>
      ) : (
        <>
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
              <div className="h-[300px]">
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
              <div className="border border-slate-300 rounded-sm p-3">
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
        </>
      )}
    </main>
  );
};

export default page;
