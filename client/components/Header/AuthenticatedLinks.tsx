import Link from "next/link";
import { SignOutButton } from "@/components";
function AuthenticatedLinks() {
  return (
    <>
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
    </>
  );
}

export default AuthenticatedLinks;
