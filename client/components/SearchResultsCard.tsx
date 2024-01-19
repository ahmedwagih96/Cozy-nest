"use client";
import { AiFillStar } from "react-icons/ai";
import { HotelType } from "@/types/mongoTypes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const SearchResultsCard = ({ hotel }: { hotel: HotelType }) => {
  const params = useSearchParams();
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0].url}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center gap-1">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(
                (_element, index) => (
                  <AiFillStar className="fill-yellow-400" key={index} />
                )
              )}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
            <span className="font-bold">${hotel.pricePerNight} per night</span>
          </div>
          <Link
            href={`/hotels/${hotel._id}?${params.toString()}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-2 md:line-clamp-4">{hotel.description}</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span
                key={facility}
                className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <Link
            href={`/hotels/${hotel._id}?${params.toString()}`}
            className="bg-blue-600 text-white p-2 font-bold text-xl max-w-fit hover:bg-blue-500 rounded-md"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
