export function convertMinutesToHoursAndMinutes(minutes: number) {
  var hours = Math.floor(minutes / 60);
  var remainingMinutes = minutes % 60;
  if (hours === 0) {
    return remainingMinutes + " minutes";
  }
  return hours + " hours and " + remainingMinutes + " minutes";
}
