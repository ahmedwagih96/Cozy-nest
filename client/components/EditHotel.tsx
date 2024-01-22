"use client";
import { useMutation } from "react-query";
import { ManageHotelForm } from "@/components";
import { useRouter } from "next/navigation";
import { HotelType } from "@/types/mongoTypes";
import { updateHotelService } from "@/services/myHotels";
import { toast } from "react-toastify";
function EditHotel({ hotel }: { hotel: HotelType }) {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(updateHotelService, {
    onSuccess: (hotel: HotelType) => {
      toast.success("Hotel Saved");
      router.push(`/hotels/${hotel._id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
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
