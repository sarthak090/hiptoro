export default function (cp) {
  const currentPage = parseInt(cp);
  return [
    {
      label: `${currentPage > 1 ? "Previous" : ""}`,
      href: `/web-stories/page/${currentPage - 1}`,
    },
    {
      label: "1",
      href: "/web-stories",
    },
    {
      label: "2",
      href: "/web-stories/page/2",
    },
    {
      label: "3",
      href: "/web-stories/page/3",
    },
    {
      label: "4",
      href: "/web-stories/page/4",
    },
    {
      label: (currentPage > 4 ? currentPage : "").toString(),
      href: `/web-stories/page/${(currentPage + 1).toString()}`,
    },
    {
      label: (currentPage >= 4 ? currentPage + 1 : "").toString(),
      href: `/web-stories/page/${(currentPage + 1).toString()}`,
    },

    {
      label: "...",
      href: "#",
    },
    {
      label: "Next",
      href: `/web-stories/page/${currentPage + 1}`,
    },
  ];
}
