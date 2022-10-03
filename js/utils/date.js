const months = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

export function formatDateTime(timestamp) {
  // multiply timestamp by 1000 to turn it into milliseconds
  const d = new Date(timestamp * 1000);

  let minutes = d.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;

  const dateString = `${d.getDate()}. ${
    months[d.getMonth()]
  } ${d.getFullYear()}, ${d.getHours()}:${minutes} Uhr`;
  return dateString;
}
