import { useState } from "react";

export default function PostOutline({
  toc,
}: {
  toc?: { id: string; title: string }[];
}) {
  const [showOutline, setShowOutline] = useState(false);

  return (
    <div className={`${showOutline ? "bg-gray-100 p-4" : ""} my-4 `}>
      <div
        className={`${
          showOutline ? "justify-between" : " gap-4  p-2 bg-gray-100 max-w-min "
        } flex text-xl   font-semibold   `}
      >
        <div
          onClick={() => {
            setShowOutline(!showOutline);
          }}
          className="hover:cursor-pointer"
        >
          Outline
        </div>
        <div
          onClick={() => {
            setShowOutline(!showOutline);
          }}
          className="hover:cursor-pointer"
        >
          +
        </div>
      </div>
      <ol className={`${showOutline ? "" : "hidden"} mt-4`} type="1">
        {toc &&
          toc.map(({ id, title }, index) => {
            return (
              <li
                key={id}
                className="lg:text-xl font-semibold font-noto_sans text-blue-600"
              >
                <a href={`#${id}`}>
                  <span>{index + 1}. </span>
                  {title}
                </a>
              </li>
            );
          })}
      </ol>
    </div>
  );
}
