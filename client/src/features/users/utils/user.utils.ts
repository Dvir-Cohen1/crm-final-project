export const isAdmin = (user: any) => {
  if (user) {
    return user.role === "admin" ? true : false;
  }
  return false;
};

export const isUserCanEdit = (user: any, loggedUser: any) => {
  if (!user || !loggedUser) return false;

  if (loggedUser.role === "admin" || loggedUser._id == user._id) {
    return true;
  }
  return false;
};
