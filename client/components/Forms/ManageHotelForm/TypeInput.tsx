"use client";
import { hotelTypes } from "@/constants/hotelOptions";
import { HotelFormData } from "@/types/typings";
import { useFormContext } from "react-hook-form";

const HotelTypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
          key={type}
            className={`cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold ${
              typeWatch === type ? "bg-blue-300" : "bg-gray-300"
            }`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type ? (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      ) : null}
    </div>
  );
};

export default HotelTypeSection;
