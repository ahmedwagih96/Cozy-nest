"use client";
import { useSearchParams, useRouter } from "next/navigation";
function Sort() {
  const params = useSearchParams();
  const router = useRouter();
  let sort: string = params.get("sort") || "";

  const handleSorting = (newSort: string) => {
    sort = newSort;
    const current = new URLSearchParams(Array.from(params.entries()));
    sort ? current.set("sort", newSort) : current.delete("sort");
    const query = current.toString();
    router.push(`/search?${query}`);
  };

  return (
    <select
      className="p-2 border rounded-md"
      value={sort}
      onChange={(e) => handleSorting(e.target.value)}
    >
      <option value="">Sort By</option>
      <option value="starRating">Star Rating</option>
      <option value="pricePerNightAsc">Price Per Night (low to high)</option>
      <option value="pricePerNightDesc">Price Per Night (high to low)</option>
    </select>
  );
}

export default Sort;
