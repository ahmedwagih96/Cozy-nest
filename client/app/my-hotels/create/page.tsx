"use client";
import { ManageHotelForm } from "@/components";
import { createHotelService } from "@/services/myHotels";
import { HotelType } from "@/types/mongoTypes";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

function page() {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(createHotelService, {
    onSuccess: (hotel: HotelType) => {
      toast.success("New Hotel Created");
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
    <main>
      <ManageHotelForm onSave={handleSave} loading={isLoading} />;
    </main>
  );
}

export default page;
