"use client";
import { HotelType } from "@/types/mongoTypes";
import Link from "next/link";

const LatestDestination = ({ hotel }: { hotel: HotelType }) => {
  return (
    <Link
      href={`/hotels/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageUrls[0].url}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl">
          {hotel.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestination;
