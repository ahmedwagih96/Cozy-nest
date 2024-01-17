"use client";
import { useAppContext } from "@/contexts/AppContext";
import Link from "next/link";
import { AuthenticatedLinks } from "@/components";

const Header = () => {
  const { user } = useAppContext();
  return (
    <header className="bg-blue-800 pt-4 pb-10">
      <div className="container mx-auto flex justify-between">
        <span className="text-xl sm:text-3xl text-white font-bold tracking-tight uppercase">
          <Link href="/">Cozy Nest</Link>
        </span>
        <nav className="flex space-x-2">
          {user?._id ? (
            <AuthenticatedLinks />
          ) : (
            <>
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
