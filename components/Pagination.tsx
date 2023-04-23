import Link from "next/link";

export default function Pagination({ currentPage }: { currentPage: number }) {
  const p = [
    {
      label: "1",
      href: "/",
    },
    {
      label: "2",
      href: "/page/2",
    },
    {
      label: "3",
      href: "/page/3",
    },
    {
      label: "4",
      href: "/page/4",
    },
  ];
  // const generatePagination = () => {
  //   return [
  //     {
  //       label: `${currentPage > 1 ? "Previous" : ""}`,
  //       href: `/page/${currentPage - 1}`,
  //     },
  //     {
  //       label: "1",
  //       href: "/",
  //     },
  //     {
  //       label: "2",
  //       href: "/page/2",
  //     },
  //     {
  //       label: "3",
  //       href: "/page/3",
  //     },
  //     {
  //       label: "4",
  //       href: "/page/4",
  //     },
  //     {
  //       label: (currentPage > 4 ? currentPage : "").toString(),
  //       href: `/page/${(currentPage + 1).toString()}`,
  //     },
  //     {
  //       label: (currentPage >= 4 ? currentPage + 1 : "").toString(),
  //       href: `/page/${(currentPage + 1).toString()}`,
  //     },

  //     {
  //       label: "...",
  //       href: "#",
  //     },
  //     {
  //       label: "Next",
  //       href: `/page/${currentPage + 1}`,
  //     },
  //   ];
  // };

  return (
    <div className="flex flex-wrap justify-center ">
      {p
        .filter((p) => p.label.length > 0)
        .map((p) => (
          <Link rel="noindex" key={Math.random()} href={p.href}>
            <div
              className={`p-4 py-2 cursor-pointer border ${
                currentPage?.toString() === p.label
                  ? "bg-blue-600 text-white"
                  : ""
              } `}
            >
              {p.label}
            </div>
          </Link>
        ))}
    </div>
  );
}
