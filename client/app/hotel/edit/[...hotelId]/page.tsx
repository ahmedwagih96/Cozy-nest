"use client";
import { useMutation, useQuery } from "react-query";
import { useParams } from "next/navigation";
import { fetchMyHotelByIdService } from "@/services/hotel";
import { useAppContext } from "@/contexts/AppContext";
import { ManageHotelForm } from "@/components";
import { updateHotelService } from "@/services/hotel";
import { useRouter } from "next/navigation";
import { HotelType } from "@/types/mongoTypes";
const page = () => {
  const router = useRouter();
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
  const { mutate, isLoading } = useMutation(updateHotelService, {
    onSuccess: ({ hotel }: { hotel: HotelType }) => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      router.push(`/hotel/${hotel._id}`);
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  if (!data?.hotel || error) {
    return <span>{error?.message}</span>;
  }

  return (
    <ManageHotelForm
      hotel={data.hotel}
      onSave={handleSave}
      loading={isLoading}
    />
  );
};

export default page;
