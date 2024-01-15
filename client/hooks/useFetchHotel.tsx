import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { useAppContext } from "@/contexts/AppContext";
import { fetchHotelByIdService } from "@/services/hotels";

function useFetchHotel() {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const {
    data: hotelData,
    isLoading,
    isError: isFetchHotelError,
    error: fetchHotelError
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

  return { hotelData, isLoading, isFetchHotelError, fetchHotelError };
}

export default useFetchHotel;
