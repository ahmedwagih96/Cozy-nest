import { useForm } from "react-hook-form";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { GuestInfoFormData } from "@/types/typings";
import { defaultDate } from "@/utils/getDefaultDate";
import * as NProgress from "nprogress";
import { useState } from "react";
function useGuestForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hotelId } = useParams();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: defaultDate(searchParams, "checkIn"),
      checkOut: defaultDate(searchParams, "checkOut"),
      adultCount: Number(searchParams.get("adultCount")) || 1,
      childCount: Number(searchParams.get("childCount")) || 0,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const handleDates = (date: Date, name: "checkIn" | "checkOut") => {
    setValue(name, date);
    if (name === "checkIn" && checkOut < date) {
      const newCheckOut = new Date(date);
      newCheckOut.setDate(newCheckOut.getDate() + 1);
      setValue("checkOut", newCheckOut);
    }
  };

  const onSubmit = (data: GuestInfoFormData) => {
    setLoading(true);
    NProgress.start();
    const queries = new URLSearchParams();
    queries.set("checkIn", data.checkIn.toISOString()),
      queries.set("checkOut", data.checkOut.toISOString()),
      queries.set("childCount", String(data.childCount));
    queries.set("adultCount", String(data.adultCount));
    router.push(`/booking/${hotelId}?${queries}`);
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    handleDates,
    checkIn,
    checkOut,
    errors,
    loading,
  };
}

export default useGuestForm;
