export const dynamic = "force-dynamic";
import { Filters, Pagination, SearchResultsCard, Sort } from "@/components";
import { searchHotelsService } from "@/services/hotels";
import { SearchParamsQueries } from "@/types/typings";

export default async function page({
  searchParams,
}: {
  searchParams: SearchParamsQueries;
}) {
  const queries = new URLSearchParams(searchParams);

  const { hotels, pagination } = await searchHotelsService(queries.toString());
  return (
    <main className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5">
      <Filters />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span className="text-xl font-bold">
            {pagination.total} Hotels found
            {searchParams?.destination ? ` in ${searchParams.destination}` : ""}
          </span>
          <Sort />
        </div>
        {hotels.map((hotel) => (
          <SearchResultsCard hotel={hotel} key={hotel._id} />
        ))}
        <Pagination pages={pagination.pages} />
      </div>
    </main>
  );
}
