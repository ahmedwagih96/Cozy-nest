"use client";
import Link from "next/link";

function error({ error }: { error: Error }) {
  const [status, message] = error.message.split("-");
  return (
    <main className="flex items-center justify-center ">
    <div className="text-center p-8 rounded">
      <div className="text-4xl font-bold text-red-500 mb-4">{status}</div>
      <h1 className="text-xl text-gray-700 mb-6 uppercase font-semibold">{message}</h1>
      <Link href="/" className="bg-blue-500 text-white py-2 px-4 text-xl rounded-md">
        Go to homepage
      </Link>
    </div>
  </main>
  );
}

export default error;
