"use client";
import * as NProgress from "nprogress";
import { useSearchParams, useRouter } from "next/navigation";

const Pagination = ({ pages }: { pages: number }) => {
  const params = useSearchParams();
  const router = useRouter();

  let pageNumber: number = Number(params.get("pageNumber")) || 1;

  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const handleChangePage = (page: number) => {
    NProgress.start();
    pageNumber = page;
    const current = new URLSearchParams(Array.from(params.entries()));
    current.set("pageNumber", String(page));
    const query = current.toString();
    router.push(`/search?${query}`);
  };

  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        {pageNumbers.map((number) => (
          <li
            onClick={() => handleChangePage(number)}
            key={number}
            className={`px-2 py-1 cursor-pointer ${
              pageNumber === number ? "bg-gray-200" : ""
            }`}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
