import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { fetchHotelByIdService } from "@/services/hotels";
import { toast } from "react-toastify";

function useFetchHotel() {
  const { hotelId } = useParams();
  const {
    data: hotel,
    isLoading,
    isError,
    error,
  } = useQuery(
    "fetchHotelById",
    () => fetchHotelByIdService(hotelId as string),
    {
      enabled: !!hotelId,
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  return { hotel, isLoading, isError, error };
}

export default useFetchHotel;
