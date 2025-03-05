export const isSameDate = (firstDate: Date, secondDate: Date): boolean => {
  return firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() === secondDate.getMonth() && firstDate.getDate() == secondDate.getDate();
}

export const getCurrentWeekDates = () => {
  const currentDate = new Date();

  // Find the first day of the week
  const firstDay = new Date(currentDate);
  firstDay.setDate(currentDate.getDate() - currentDate.getDay());

  // Find the last day of the week
  const lastDay = new Date(currentDate);
  lastDay.setDate(currentDate.getDate() - currentDate.getDay() + 6);

  return [
    firstDay,
    lastDay
  ];
}
