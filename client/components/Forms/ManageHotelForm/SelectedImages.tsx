"use client";
import { HotelFormData } from "@/types/typings";
import { deleteFileFromList } from "@/utils/updateFileList";
import { useFormContext } from "react-hook-form";
function SelectedImages() {
  const { watch, setValue } = useFormContext<HotelFormData>();
  const selectedImages = watch("imageFiles");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: File
  ) => {
    event.preventDefault();
    const updatedList = deleteFileFromList(selectedImages, file);
    setValue("imageFiles", updatedList);
  };
  return (
    <>
      {selectedImages
        ? Array.from(selectedImages).map((file) => (
            <div className="relative group" key={file.name}>
              <img
                src={URL.createObjectURL(file)}
                className="min-h-full object-cover"
              />
              <button
                type="button"
                onClick={(event) => handleDelete(event, file)}
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

export default SelectedImages;
