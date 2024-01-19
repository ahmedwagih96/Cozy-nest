"use client";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useSearchBar from "@/hooks/useSearchBar";

const SearchBar = () => {
  const { queries, handleQueries, handleDates, clearQueries, onSubmit } =
    useSearchBar();
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="max-w-[600px] mx-auto">
      <form
        className="-mt-4 mx-2 p-1 bg-orange-400 rounded shadow-md grid grid-cols-1 lg:grid-cols-2  items-center gap-1"
        onSubmit={onSubmit}
      >
        <div className="flex flex-row items-center flex-1 bg-white p-2">
          <MdTravelExplore size={25} className="mr-2" />
          <input
            placeholder="Destination"
            name="destination"
            value={queries.destination}
            onChange={handleQueries}
            type="text"
            className="text-md w-full focus:outline-none"
          />
        </div>

        <div className="flex">
          <DatePicker
            selected={queries.checkIn}
            onChange={(date) => handleDates(date as Date, "checkIn")}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            className="w-full bg-white p-2 focus:outline-none"
            wrapperClassName="flex-1"
          />
          <DatePicker
            selected={queries.checkOut}
            onChange={(date) => handleDates(date as Date, "checkOut")}
            minDate={
              new Date(
                new Date(queries.checkIn).setDate(queries.checkIn.getDate() + 1)
              )
            }
            maxDate={maxDate}
            placeholderText="Check-out Date"
            className="w-full bg-white p-2 focus:outline-none"
            wrapperClassName="flex-1"
          />
        </div>
        <div className="flex bg-white px-2 py-1 gap-2">
          <label className="items-center flex">
            Adults:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              name="adultCount"
              value={queries.adultCount}
              min={1}
              max={20}
              onChange={handleQueries}
            />
          </label>
          <label className="items-center flex">
            Children:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              name="childCount"
              onChange={handleQueries}
              value={queries.childCount}
              min={0}
              max={20}
            />
          </label>
        </div>

        <div className="flex gap-1">
          <button
            className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500 rounded-md"
            type="submit"
          >
            Search
          </button>
          <button
            className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500 rounded-md"
            onClick={clearQueries}
            type="button"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
