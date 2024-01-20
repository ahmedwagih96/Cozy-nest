import Link from "next/link";

function GuestNav() {
  return (
    <ul className="flex space-x-2">
      <Link
        href="/sign-in"
        className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 rounded-md"
      >
        Sign In
      </Link>
      <Link
        href="/register"
        className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 rounded-md"
      >
        Register
      </Link>
    </ul>
  );
}

export default GuestNav;
