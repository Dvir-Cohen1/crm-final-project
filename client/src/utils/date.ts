export const formatDateTimeToString = (dateTime: string, showTime = true) => {
  const date = new Date(dateTime);
  const time = showTime ? `at ${date.getHours()}:${date.getMinutes()}` : "";
  return `${date.toLocaleString("en", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()} ${time}`;
};
