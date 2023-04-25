import { useState } from "react";
import { useRouter } from "next/router";
export default function HeaderSearch() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e);
    router.push(`/search?s=${searchText}`);
  };
  return (
    <form onSubmit={onFormSubmit}>
      <div className="hidden xl:flex items-center">
        <input
          className="p-2 outline-none text-black"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <label
          onClick={onFormSubmit}
          htmlFor=""
          className="bg-[#fbfbfb2b] p-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </label>
      </div>
    </form>
  );
}
