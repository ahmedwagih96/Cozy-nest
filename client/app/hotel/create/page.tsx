"use client";
import { ManageHotelForm } from "@/components";
import { useAppContext } from "@/contexts/AppContext";
import { createHotelService } from "@/services/hotel";
import { HotelType } from "@/types/mongoTypes";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

function page() {
  const { showToast } = useAppContext();
  const router = useRouter();
  const { mutate, isLoading } = useMutation(createHotelService, {
    onSuccess: ({ hotel }: { hotel: HotelType }) => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      router.push(`/hotel/${hotel._id}`);
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} loading={isLoading} />;
}

export default page;
