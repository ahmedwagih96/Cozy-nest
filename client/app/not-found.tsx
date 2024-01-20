import Link from "next/link";

function index() {
  return (
    <main className="flex items-center justify-center ">
      <div className="text-center p-8 rounded">
        <div className="text-4xl font-bold text-red-500 mb-4">404</div>
        <h1 className="text-xl text-gray-700 mb-6 uppercase font-semibold">
          Page Not Found
        </h1>
        <Link
          href="/"
          className="bg-blue-500 text-white py-2 px-4 text-xl rounded-md"
        >
          Go to homepage
        </Link>
      </div>
    </main>
  );
}

export default index;
