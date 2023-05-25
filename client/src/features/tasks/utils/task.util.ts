// is item pinned? changne the star icon color
export const isItemPinned = (userPinnedItems: any, itemId: any) => {
  return userPinnedItems?.some((item: any) => item._id === itemId);
};
