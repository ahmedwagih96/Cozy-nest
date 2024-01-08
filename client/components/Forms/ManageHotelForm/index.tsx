"use client";
import {
  DetailsInput,
  FacilitiesInput,
  GuestsInput,
  ImagesInput,
  TypeInput,
} from "@/components";
import useManageHotel from "@/hooks/useManageHotel";
import { ManageHotelFormProps } from "@/types/props";
import { FormProvider } from "react-hook-form";

function ManageHotelForm({ onSave, loading, hotel }: ManageHotelFormProps) {
  const { formMethods, onSubmit } = useManageHotel({ onSave, hotel });
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsInput />
        <TypeInput />
        <FacilitiesInput />
        <GuestsInput />
        <ImagesInput />
        <span className="flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500 rounded-md"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
