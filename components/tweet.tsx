import React from "react";

export default function tweet() {
  return (
    <div
      className="w-[500px] p-8 text-black border border-gray-200 bg-white rounded-2xl "
      data-style="undefined"
    >
      <div className=" flex items-center justify-between">
        <div className="relative flex items-center">
          <img
            className="w-12 h-12 rounded-full"
            src="https://pbs.twimg.com/profile_images/1629316242761998338/q3Ri03si_normal.jpg"
          />
          <div className="ml-4">
            <a
              className="text-blue-400"
              target="_blank"
              href="https://twitter.com/pannyan21"
            >
              @pannyan21
            </a>
          </div>
        </div>
        <svg
          className="text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="32"
          height="32"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"
          ></path>
        </svg>
      </div>

      <div className="mt-4">
        Not a movie but the scariest show/anything I’ve ever seen in my life was
        Marianne on Netflix.
        <div className="border border-gray-200 rounded-2xl mt-4 overflow-hidden"></div>
      </div>
    </div>
  );
}
