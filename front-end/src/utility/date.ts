export function getDates() {
  const date = new Date();
  return {
    currentMonth: date.getMonth(), // 0-indexed
    currentYear: date.getFullYear(),
  };
}

export function getDaysCount(year: number, month: number): number {
  // month is 1-based index (e.g. 1 for Jan, 12 for Dec)
  // Getting day 0 of the next month returns the last day of the target month
  return new Date(year, month, 0).getDate();
}

export function getDaysInCurrentMonth(): number {
  const { currentMonth, currentYear } = getDates();
  return getDaysCount(currentYear, currentMonth + 1);
}



