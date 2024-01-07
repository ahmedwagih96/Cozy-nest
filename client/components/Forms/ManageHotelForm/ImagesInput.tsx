"use client";
import { HotelFormData } from "@/types/typings";
import { useFormContext } from "react-hook-form";
const ImagesInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              if (!imageFiles.length) {
                return "At least one image should be added";
              }
              if (imageFiles.length > 6) {
                return "Total number of images cannot be more than 6";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles ? (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      ) : null}
    </div>
  );
};

export default ImagesInput;
