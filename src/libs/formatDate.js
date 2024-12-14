export function formatDate(date) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = new Date(date).toLocaleString("id-ID", options);
  return formattedDate;
}
