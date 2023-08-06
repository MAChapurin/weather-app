export function replaceDate(date, num = 1) {
  const DAY_IN_MLS = 86400000; //сутки в миллисекундах
 return new Date(new Date(date).getTime() + DAY_IN_MLS * num)
}
