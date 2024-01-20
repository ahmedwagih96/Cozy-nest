import Link from "next/link";
import { SignOutButton } from "@/components";
function LargeNav() {
  return (
    <ul className="hidden md:flex space-x-2">
      <Link
        className="flex items-center text-white px-3 font-bold hover:bg-blue-600 rounded-md"
        href="/my-bookings"
      >
        My Bookings
      </Link>
      <Link
        className="flex items-center text-white px-3 font-bold hover:bg-blue-600 rounded-md"
        href="/my-hotels"
      >
        My Hotels
      </Link>
      <SignOutButton />
    </ul>
  );
}

export default LargeNav;
