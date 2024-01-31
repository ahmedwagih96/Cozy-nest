"use client";
import DatePicker from "react-datepicker";
import useGuestForm from "@/hooks/useGuestForm";

const GuestInfoForm = ({ pricePerNight }: { pricePerNight: number }) => {
  const {
    onSubmit,
    register,
    handleSubmit,
    handleDates,
    checkIn,
    checkOut,
    errors,
    loading,
  } = useGuestForm();

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => handleDates(date as Date, "checkIn")}
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
              onChange={(date) => handleDates(date as Date, "checkOut")}
              minDate={
                new Date(new Date(checkIn).setDate(checkIn.getDate() + 1))
              }
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
            {errors.adultCount ? (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            ) : null}
          </div>
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl"
          >
            {loading ? "Loading..." : "Book Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
