"use client";
import { useMutation } from "react-query";
import { useAppContext } from "@/contexts/AppContext";
import { ManageHotelForm } from "@/components";
import { useRouter } from "next/navigation";
import { HotelType } from "@/types/mongoTypes";
import { updateHotelService } from "@/services/myHotels";
function EditHotel({ hotel }: { hotel: HotelType }) {
  const router = useRouter();
  const { showToast } = useAppContext();
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
  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} loading={isLoading} />
  );
}

export default EditHotel;
