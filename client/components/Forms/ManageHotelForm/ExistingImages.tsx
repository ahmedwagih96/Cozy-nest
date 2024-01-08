"use client";
import { HotelFormData } from "@/types/typings";
import { useFormContext } from "react-hook-form";
function ExistingImages() {
  const { watch, setValue } = useFormContext<HotelFormData>();
  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((image) => image.url !== imageUrl)
    );
  };
  return (
    <>
      {existingImageUrls
        ? existingImageUrls.map((image) => (
            <div className="relative group" key={image.url}>
              <img src={image.url} className="min-h-full object-cover" />
              <button
                type="button"
                onClick={(event) => handleDelete(event, image.url)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
              >
                Delete
              </button>
            </div>
          ))
        : null}
    </>
  );
}

export default ExistingImages;
