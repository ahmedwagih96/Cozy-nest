import { SearchQueries } from "@/types/typings";
import { ChangeEvent, useState, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { initialQueriesState } from "@/constants/initialStates";
import { defaultDate } from "@/utils/getDefaultDate";
import * as NProgress from "nprogress";

function useSearchBar() {
  const params = useSearchParams();
  const router = useRouter();



  // state
  const [queries, setQueries] = useState<SearchQueries>({
    destination: params.get("destination") || "",
    checkIn: defaultDate(params, "checkIn"),
    checkOut: defaultDate(params, "checkOut"),
    adultCount: Number(params.get("adultCount")) || 1,
    childCount: Number(params.get("childCount")) || 0,
  });

  const handleQueries = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "childCount" || name === "adultCount") {
      setQueries((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
      return;
    }

    setQueries((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDates = (date: Date, name: string) => {
    setQueries((prev) => ({
      ...prev,
      [name]: date,
    }));
    if (name === "checkIn" && queries.checkOut < date) {
      const newCheckOut = new Date(date);
      newCheckOut.setDate(newCheckOut.getDate() + 1);
      setQueries((prev) => ({
        ...prev,
        checkOut: newCheckOut,
      }));
    }
  };

  const clearQueries = () => {
    setQueries(initialQueriesState);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    NProgress.start();
    e.preventDefault();
    const current = new URLSearchParams(Array.from(params.entries()));

    queries.destination
      ? current.set("destination", queries.destination)
      : current.delete("destination");
    queries.childCount
      ? current.set("childCount", String(queries.childCount))
      : current.delete("childCount");
    queries.adultCount
      ? current.set("adultCount", String(queries.adultCount))
      : current.delete("adultCount");
    queries.checkIn
      ? current.set("checkIn", queries.checkIn.toISOString())
      : current.delete("checkIn");
    queries.checkIn
      ? current.set("checkOut", queries.checkOut.toISOString())
      : current.delete("checkOut");
    if (current.get("pageNumber")) {
      current.delete("pageNumber");
    }
    const query = current.toString();
    router.push(`/search/?${query}`);
  };

  return {
    queries,
    handleQueries,
    handleDates,
    clearQueries,
    onSubmit,
  };
}

export default useSearchBar;
