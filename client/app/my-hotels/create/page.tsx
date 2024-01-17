"use client";
import { ManageHotelForm } from "@/components";
import { useAppContext } from "@/contexts/AppContext";
import { createHotelService } from "@/services/myHotels";
import { HotelType } from "@/types/mongoTypes";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

function page() {
  const { showToast } = useAppContext();
  const router = useRouter();
  const { mutate, isLoading } = useMutation(createHotelService, {
    onSuccess: ({ hotel }: { hotel: HotelType }) => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      router.push(`/hotels/${hotel._id}`);
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
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
