"use client";
import { Filters, Pagination, SearchResultsCard, Sort } from "@/components";
import { searchHotelsService } from "@/services/hotels";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
function page() {
  const params = useSearchParams();
  const { data, isError, isLoading } = useQuery(
    ["searchHotels", params.toString()],
    () => searchHotelsService(params.toString())
  );

  if (isLoading) return <p>Loading</p>;

  if (isError) return <p>Error</p>;

  if (!isLoading && !data?.hotels?.length) return <p>Not Hotels found</p>;

  return (
    <main className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
          <Filters />
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {data?.pagination.total} Hotels found
            {params.get("destination")
              ? ` in ${params.get("destination")}`
              : ""}
          </span>
          <Sort />
        </div>
        {data?.hotels.map((hotel) => (
          <SearchResultsCard hotel={hotel} key={hotel._id} />
        ))}
          <Pagination pages={data?.pagination.pages} />
      </div>
    </main>
  );
}

export default page;
