export default function (cp) {
  const currentPage = parseInt(cp);
  return [
    {
      label: `${currentPage > 1 ? "Previous" : ""}`,
      href: `/page/${currentPage - 1}`,
    },
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
    {
      label: (currentPage > 4 ? currentPage : "").toString(),
      href: `/page/${(currentPage + 1).toString()}`,
    },
    {
      label: (currentPage >= 4 ? currentPage + 1 : "").toString(),
      href: `/page/${(currentPage + 1).toString()}`,
    },

    {
      label: "...",
      href: "#",
    },
    {
      label: "Next",
      href: `/page/${currentPage + 1}`,
    },
  ];
}
