function getAllTimeCoding(startDate: Date) {
  const now = new Date();
  const diffMs = now.getTime() - startDate.getTime();

  const totalMinutes = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}

function hoursToMinutes(hours: number) {
  return hours * 60;
}
export { getAllTimeCoding, hoursToMinutes };