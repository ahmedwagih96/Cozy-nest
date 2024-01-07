import { useForm } from "react-hook-form";
import { HotelFormData } from "@/types/typings";

type Parameters = {
  onSave: (formData: FormData) => void;
};

function useManageHotel({ onSave }: Parameters) {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

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
