"use client";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";
import { fetchMyHotelByIdService } from "@/services/hotel";
import { useAppContext } from "@/contexts/AppContext";
import { ManageHotelForm } from "@/components";

const page = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const { data, error } = useQuery(
    "fetchHotelById",
    () => fetchMyHotelByIdService(hotelId as string),
    {
      enabled: !!hotelId,
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  if (!data?.hotel || error) {
    return <span>{error?.message}</span>;
  }

  return <ManageHotelForm hotel={data.hotel} />;
};

export default page;
