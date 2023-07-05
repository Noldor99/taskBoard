export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0'); // День
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Місяць
  const year = date.getFullYear(); // Рік
  return `${day}.${month}.${year}`;
}
