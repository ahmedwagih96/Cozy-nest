"use client";
import { hotelFacilities, hotelTypes } from "@/constants/hotelOptions";
import useFilters from "@/hooks/useFilters";

function Filters() {
  const { filters, handleFilters } = useFilters();
  return (
    <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
      <div className="space-y-5">
        <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
          Filter by:
        </h3>
        {/* STAR RATING */}
        <div className="border-b border-slate-300 pb-5">
          <h4 className="text-md font-semibold mb-2">Property Rating</h4>
          {["5", "4", "3", "2", "1"].map((star) => (
            <label key={star} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                value={star}
                onChange={handleFilters}
                name="starRating"
                checked={filters.starRating.includes(star)}
              />
              <span>{star} Stars</span>
            </label>
          ))}
        </div>
        {/* HOTEL TYPE */}
        <div className="border-b border-slate-300 pb-5">
          <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
          {hotelTypes.map((hotelType) => (
            <label className="flex items-center space-x-2" key={hotelType}>
              <input
                type="checkbox"
                className="rounded"
                value={hotelType}
                onChange={handleFilters}
                name="hotelType"
                checked={filters.hotelType.includes(hotelType)}
              />
              <span>{hotelType}</span>
            </label>
          ))}
        </div>
        {/* FACILITIES */}
        <div className="border-b border-slate-300 pb-5">
          <h4 className="text-md font-semibold mb-2">Facilities</h4>
          {hotelFacilities.map((facility) => (
            <label key={facility} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                value={facility}
                name="facilities"
                onChange={handleFilters}
                checked={filters.facilities.includes(facility)}
              />
              <span>{facility}</span>
            </label>
          ))}
        </div>
        {/* MAX PRICE */}
        <div>
          <h4 className="text-md font-semibold mb-2"> Max Price</h4>
          <select
            className="p-2 border rounded-md w-full"
            onChange={handleFilters}
            value={filters.maxPrice}
            name="maxPrice"
          >
            <option value="">Select Max Price</option>
            {[50, 100, 200, 300, 500].map((price) => (
              <option value={price} key={price}>
                {price}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;
