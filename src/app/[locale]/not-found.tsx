import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-400 hover:underline">
        Go back home
      </Link>
    </div>
  );
}
