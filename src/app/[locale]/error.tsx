"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <h1 className="text-5xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-4">{error.message || "An unexpected error occurred."}</p>
      <button className="px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
