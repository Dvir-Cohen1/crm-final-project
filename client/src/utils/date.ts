export const formatDateTimeToString = (dateTime: string) => {
     const date = new Date(dateTime);
     const formattedDate = `${date.toLocaleString('en', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
     return formattedDate;
   }
 