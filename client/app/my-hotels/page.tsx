import Link from "next/link";
import { MyHotel } from "@/components";
import { fetchMyHotelsService } from "@/services/serverSide";

export default async function page() {
  const hotels = await fetchMyHotelsService();

  return (
    <main className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          href="/my-hotels/create"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded-sm"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotels?.map((hotel) => (
          <MyHotel hotel={hotel} key={hotel._id} />
        ))}
      </div>
    </main>
  );
}
