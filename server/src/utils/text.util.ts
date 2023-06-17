export const createSlugFromText = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, "_");
};
