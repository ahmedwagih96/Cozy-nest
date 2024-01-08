import { useForm } from "react-hook-form";
import { HotelFormData } from "@/types/typings";
import { HotelType } from "@/types/mongoTypes";
import { useEffect } from "react";

type Parameters = {
  onSave: (formData: FormData) => void;
  hotel?: HotelType;
};

function useManageHotel({ onSave, hotel }: Parameters) {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(()=>{
    reset(hotel);
  }, [hotel, reset])
  
  const onSubmit = handleSubmit((hotelData: HotelFormData) => {
    const formData = new FormData();
    formData.append("name", hotelData.name);
    formData.append("city", hotelData.city);
    formData.append("country", hotelData.country);
    formData.append("description", hotelData.description);
    formData.append("type", hotelData.type);
    formData.append("pricePerNight", hotelData.pricePerNight.toString());
    formData.append("starRating", hotelData.starRating.toString());
    formData.append("adultCount", hotelData.adultCount.toString());
    formData.append("childCount", hotelData.childCount.toString());

    hotelData.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (hotelData.imageFiles) {
      Array.from(hotelData.imageFiles).forEach((imageFile) => {
        formData.append(`imageFiles`, imageFile);
      });
    }

    onSave(formData);
  });

  return { onSubmit, formMethods };
}

export default useManageHotel;
