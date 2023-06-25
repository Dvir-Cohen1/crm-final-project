export const formatDateTimeToString = (dateTime: string) => {
  const date = new Date(dateTime);
  return `${date.toLocaleString("en", {
    month: "short",
  })} ${date.getDate()}, ${date.getFullYear()}`;
};
