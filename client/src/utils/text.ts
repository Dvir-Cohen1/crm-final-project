/**
 * Create sub string by given min and max number
 */
export function createSubString(string: string, min = 0, max = 23) {
  // Check if the type of the argument is string
  if (typeof string !== "string" || !string) {
    return;
  }

  // Check the number of the max characters
  if (string.length > max) {
    const subString = string?.substring(min, max) + "...";
    return subString;
  }

  return string;
}
/**
 * Create sub words by given min and max number
 */
export function createSubWords(string: string, min = 0, max = 4) {
  if (typeof string !== "string" || !string) {
    return;
  }
  // Split the string into an array of words
  const words = string?.split(" ");
  if (words.length > max) {
    // Join the first 10 words and add three dots
    return (string = words?.slice(min, max).join(" ") + "...");
  }
  console.log(string);
  return string;
}

/**
 * Capitalize first letters of each word
 */
export function capitalizeFirstLetters(text: string) {
  // Split the text into an array of words
  let words = text?.split(" ");

  // Capitalize the first letter of each word
  let capitalizedWords = words?.map(function (word) {
    return word?.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the modified words back into a string
  let capitalizedText = capitalizedWords?.join(" ");

  return capitalizedText;
}
