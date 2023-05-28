// is item pinned? changne the star icon color
export const isItemPinned = (userPinnedItems: any, itemId: any) => {
  return userPinnedItems?.some((item: any) => item._id === itemId);
};

export const normalizeStatusesArray = (tasksStatuses: any) => {
  let statuses: { key: string; label: string; color: string }[] = [];
  tasksStatuses.map((status: any) => {
    statuses.push({
      key: status._id,
      label: status.label,
      color: status.color,
    });
  });
  return statuses;
};
