import { SearchQueries } from "@/types/typings";
import { ChangeEvent, useState, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { initialQueriesState } from "@/constants/initialStates";

function useSearchBar() {
  const params = useSearchParams();
  const router = useRouter();
  // state
  const [queries, setQueries] = useState<SearchQueries>({
    destination: params.get("destination") || "",
    checkIn: params.get("checkIn")
      ? new Date(params.get("checkIn") as string)
      : new Date(),
    checkOut: params.get("checkOut")
      ? new Date(params.get("checkOut") as string)
      : new Date(),
    adultCount: Number(params.get("adultCount")) || 1,
    childCount: Number(params.get("childCount")) || 1,
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
  };

  const clearQueries = () => {
    setQueries(initialQueriesState);
    router.push(`/search`);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      : current.delete("childCount");
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
