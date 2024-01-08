"use client";
import { HotelFormData } from "@/types/typings";
import { useFormContext } from "react-hook-form";
import { SelectedImages, ExistingImages } from "@/components";
import { addFileToList } from "@/utils/updateFileList";
const ImagesInput = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const existingImageUrls = watch("imageUrls");
  const selectedFiles = watch("imageFiles");

  const customOnChange = (filesToBeAdded: FileList) => {
    const newList = addFileToList(selectedFiles, filesToBeAdded);
    setValue("imageFiles", newList);
  };

  const { ref, name } = register("imageFiles", {
    validate: (imageFiles) => {
      const totalLength = imageFiles.length + existingImageUrls.length;
      if (!totalLength) {
        return "At least one image should be added";
      }
      if (totalLength > 6) {
        return "Total number of images cannot be more than 6";
      }
      return true;
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <ExistingImages />
          <SelectedImages />
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          ref={ref}
          name={name}
          onChange={(e) => {
            if (e.target.files) customOnChange(e.target.files);
          }}
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
