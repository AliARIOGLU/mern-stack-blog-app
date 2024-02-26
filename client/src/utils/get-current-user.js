export const getCurrentUserFromLocalStorage = () => {
  const { user } = JSON.parse(localStorage.getItem("persist:root"));

  const { currentUser } = JSON.parse(user);

  return currentUser;
};
