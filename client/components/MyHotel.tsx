import { BsBuilding, BsMap } from "react-icons/bs";
import { BiMoney, BiStar } from "react-icons/bi";
import Link from "next/link";
import { HotelType } from "@/types/mongoTypes";

function MyHotel({ hotel }: { hotel: HotelType }) {
  return (
    <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
      <Link href={`/hotels/${hotel._id}`}>
        <h2 className="text-2xl font-bold text-blue-600">{hotel.name}</h2>
      </Link>
      <div className="whitespace-pre-line">{hotel.description}</div>
      <div className="grid grid-cols-2 lg:grid-cols-4  gap-2">
        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
          <BsMap className="mr-1" />
          {hotel.city}, {hotel.country}
        </div>
        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
          <BsBuilding className="mr-1" />
          {hotel.type}
        </div>
        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
          <BiMoney className="mr-1" />£{hotel.pricePerNight} per night
        </div>
        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
          <BiStar className="mr-1" />
          {hotel.starRating} Star Rating
        </div>
      </div>
      <span className="flex justify-end">
        <Link
          href={`/my-hotels/edit/${hotel._id}`}
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded-sm"
        >
          Edit
        </Link>
      </span>
    </div>
  );
}

export default MyHotel;
