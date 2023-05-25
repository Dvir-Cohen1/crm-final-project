/**
 * Create sub string by given min and max number
 */
export function createSubString(string: string, min = 0, max = 10) {
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
  return string;
}
