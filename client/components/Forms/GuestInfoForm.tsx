"use client";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useAppContext } from "../../contexts/AppContext";
import { useRouter } from "next/navigation";
import { GuestInfoFormData } from "@/types/typings";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const { user } = useAppContext();
  const router = useRouter();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: new Date(),
      checkOut: new Date(),
      adultCount: 1,
      childCount: 0,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSubmit = (data: GuestInfoFormData) => {
    const queries = new URLSearchParams();
    queries.set("checkIn", data.checkIn.toISOString()),
      queries.set("checkOut", data.checkOut.toISOString()),
      queries.set("childCount", String(data.childCount));
    queries.set("adultCount", String(data.adultCount));
    if (user?._id) {
      router.push(`/booking/${hotelId}/${queries}`);
    } else {
      router.push(`/sign-in`, {

      });
    }
  };

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">£{pricePerNight}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
