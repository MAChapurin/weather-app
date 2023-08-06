const directions = ["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"];

export function calсulateDirection(deg) {
  if (338 < deg || deg <= 22) return directions[0];
  if (deg > 22 && deg <= 68) return directions[1];
  if (deg > 68 && deg <= 112) return directions[2];
  if (deg > 112 && deg <= 157) return directions[3];
  if (deg > 157 && deg <= 202) return directions[4];
  if (deg > 202 && deg <= 247) return directions[5];
  if (deg > 247 && deg <= 292) return directions[6];
  if (deg > 292 && deg <= 338) return directions[7];
}
