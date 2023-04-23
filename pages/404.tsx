import Link from "next/link";

export default function Custom404() {
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-semibold my-4">This page does not exist.</h1>
      <div className="flex justify-center">
        <img src="/imgs/logo.webp" />
      </div>
      <div className="flex justify-center items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>

        <Link className="text-2xl underline text-center" href={"/"}>
          Go to Home
        </Link>
      </div>
    </div>
  );
}
