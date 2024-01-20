"use client";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { SignOutButton } from "@/components";

function Dropdown({
  setDropDown,
}: {
  setDropDown: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <ul className="flex flex-col gap-2 absolute right-0 top-[170%] w-[200px] p-2 bg-blue-800 rounded-md">
      <Link
        onClick={() => {
          setDropDown(false);
        }}
        className="text-white duration-200 font-bold hover:pl-2 hover:bg-blue-600 rounded-md"
        href="/my-bookings"
      >
        My Bookings
      </Link>
      <Link
        onClick={() => {
          setDropDown(false);
        }}
        className="text-white duration-200 font-bold hover:pl-2 hover:bg-blue-600 rounded-md"
        href="/my-hotels"
      >
        My Hotels
      </Link>
      <SignOutButton mobile={true} />
    </ul>
  );
}

export default Dropdown;
