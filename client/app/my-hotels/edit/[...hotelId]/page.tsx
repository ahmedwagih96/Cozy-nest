"use client";
import { useMutation, useQuery } from "react-query";
import { useParams } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import { ManageHotelForm } from "@/components";
import { useRouter } from "next/navigation";
import { HotelType } from "@/types/mongoTypes";
import {
  fetchMyHotelByIdService,
  updateHotelService,
} from "@/services/myHotels";
const page = () => {
  const router = useRouter();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const { data: hotel, error } = useQuery(
    "fetchHotelById",
    () => fetchMyHotelByIdService(hotelId as string),
    {
      enabled: !!hotelId,
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );
  const { mutate, isLoading } = useMutation(updateHotelService, {
    onSuccess: (hotel: HotelType) => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      router.push(`/hotels/${hotel._id}`);
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  if (!hotel || error) {
    return <></>;
  }

  return (
    <main>
      <ManageHotelForm hotel={hotel} onSave={handleSave} loading={isLoading} />
    </main>
  );
};

export default page;
