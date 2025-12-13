export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="bg-[#1a1a1a] h-screen flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-[#e11f2c] text-xl font-bold">Something went wrong</h1>
      <p className="text-white mt-2">{error.message || "An unexpected error occurred"}</p>

      <button
        onClick={resetErrorBoundary}
        className="mt-4 bg-[#e11f2c] text-white px-4 py-2 rounded cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
