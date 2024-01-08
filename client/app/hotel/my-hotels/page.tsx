"use client";
import { useQuery } from "react-query";
import { fetchMyHotelsService } from "@/services/hotel";
import Link from "next/link";
import { MyHotel } from "@/components";

const page = () => {
  const { data, isLoading } = useQuery("fetchMyHotels", fetchMyHotelsService, {
    onError: () => {},
  });

  if (!isLoading && !data?.hotels.length)  {
    return <span>You do not have any hotels yet</span>;
  }

 

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          href="hotel/create"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded-sm"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {data?.hotels.map((hotel) => (
          <MyHotel hotel={hotel} key={hotel._id} />
        ))}
      </div>
    </div>
  );
};

export default page;
