"use client";
import { useSearchParams, useRouter } from "next/navigation";
function Sort() {
  const params = useSearchParams();
  const router = useRouter();
  let currentSort: string = params.get("sort") || "";

  const handleSorting = (newSort: string) => {
    const current = new URLSearchParams(Array.from(params.entries()));
    newSort ? current.set("sort", newSort) : current.delete("sort");
    const query = current.toString();
    router.push(`/search?${query}`, { scroll: false });
  };

  return (
    <select
      className="p-2 border rounded-md max-w-[300px] ml-auto outline-none"
      value={currentSort}
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
