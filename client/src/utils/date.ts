/**
 * Formats a given dateTime string to a human-readable date string with optional time information.
 * @param {string} dateTime - The input date and time string in a valid date format.
 * @param {boolean} showTime - Flag to indicate whether to include the time part in the output. Default is true.
 * @param {boolean} showTodayYesterdayString - Flag to indicate whether to show "Today" or "Yesterday" if applicable. Default is true.
 * @returns {string} The formatted date string based on the input dateTime and options.
 */
export const formatDateTimeToString = (
  dateTime: string,
  showTime = true,
  showTodayYesterdayString = true
) => {
  const date = new Date(dateTime);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Check if the provided date is today
  const isToday = date.toDateString() === today.toDateString();

  // Check if the provided date is yesterday
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (!showTodayYesterdayString && !showTime) {
    // Return formatted date without time and "Today"/"Yesterday" strings
    return date.toLocaleString("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  if (isToday && showTodayYesterdayString) {
    // Return "Today" if the date is today
    return showTime
      ? `Today at ${date.toLocaleTimeString("en", {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      : "Today";
  } else if (isYesterday && showTodayYesterdayString) {
    // Return "Yesterday" if the date is yesterday
    return showTime
      ? `Yesterday at ${date.toLocaleTimeString("en", {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      : "Yesterday";
  } else {
    // If it's not today or yesterday, proceed with the original logic
    const time = showTime
      ? `at ${date.toLocaleTimeString("en", {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      : "";
    return `${date.toLocaleString("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })} ${time}`;
  }
};
