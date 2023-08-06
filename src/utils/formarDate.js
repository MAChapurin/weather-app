export function formatDate(date = new Date(), hour = false) {
  const DAY_IN_MLS = 86400000; //сутки в миллисекундах
  if (hour) {
    return Intl.DateTimeFormat("ru", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }
  if (
    new Date(new Date().getTime() + DAY_IN_MLS).getDate() === date.getDate()
  ) {
    return "завтра";
  }
  return new Intl.DateTimeFormat("ru", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}
