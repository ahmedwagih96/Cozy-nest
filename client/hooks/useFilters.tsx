import { FiltersState } from "@/types/typings";
import { ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import * as NProgress from "nprogress";
function useFilters() {
  const params = useSearchParams();
  const router = useRouter();

  let filters: FiltersState = {
    hotelType: params.get("hotelType")?.split("-") || [],
    starRating: params.get("starRating")?.split("-") || [],
    maxPrice: Number(params.get("maxPrice")) || 0,
    facilities: params.get("facilities")?.split("-") || [],
  };

  const handleFilters = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (
      name === "facilities" ||
      name === "starRating" ||
      name === "hotelType"
    ) {
      filters = {
        ...filters,
        [name]: filters[name].includes(value)
          ? filters[name].filter((item) => item !== value)
          : [...filters[name], value],
      };
    } else {
      filters = {
        ...filters,
        [name]: value,
      };
    }

    updateQueries(name);
  };

  const updateQueries = (name: string) => {
    NProgress.start();
    const current = new URLSearchParams(Array.from(params.entries()));
    switch (name) {
      case "hotelType":
      case "facilities":
      case "starRating":
        filters[name].length
          ? current.set(name, filters[name].join("-"))
          : current.delete(name);
        break;
      case "maxPrice":
        filters.maxPrice
          ? current.set(name, String(filters[name]))
          : current.delete("maxPrice");
        break;
      default:
        current.delete(name);
    }

    if (current.get("pageNumber")) {
      current.delete("pageNumber");
    }
    const query = current.toString();
    router.push(`/search?${query}`, { scroll: false });
  };

  return {
    filters,
    handleFilters,
  };
}

export default useFilters;
