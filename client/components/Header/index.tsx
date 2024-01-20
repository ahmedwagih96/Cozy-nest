"use client";
import { useAppContext } from "@/contexts/AppContext";
import Link from "next/link";
import { GuestNav, LargeNav, MobileNav } from "@/components";

const Header = () => {
  const { user } = useAppContext();
  return (
    <header className="bg-blue-800 py-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}
        <span className="text-xl sm:text-3xl text-white font-bold tracking-tight uppercase">
          <Link href="/">Cozy Nest</Link>
        </span>
        {/* NAVIGATION */}
        <nav>
          {user?._id ? (
            <>
              <MobileNav />
              <LargeNav />
            </>
          ) : (
            <GuestNav />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
