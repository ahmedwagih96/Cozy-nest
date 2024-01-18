import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { useAppContext } from "@/contexts/AppContext";
import { fetchHotelByIdService } from "@/services/hotels";

function useFetchHotel() {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const {
    data: hotel,
    isLoading,
    isError,
    error
  } = useQuery(
    "fetchHotelById",
    () => fetchHotelByIdService(hotelId as string),
    {
      enabled: !!hotelId,
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  return { hotel, isLoading, isError, error };
}

export default useFetchHotel;
