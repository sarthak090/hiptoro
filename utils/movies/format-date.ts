export function formatReleaseDate(dateString: string): string {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, month, day]: number[] = dateString.split("-").map(Number);
  const formattedDate: string = `${day} ${months[month - 1]} ${year}`;

  return formattedDate;
}
