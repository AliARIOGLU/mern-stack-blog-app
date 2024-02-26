import { redirect } from "react-router-dom";

import { getCurrentUserFromLocalStorage } from "../utils/get-current-user";

// if login user try to navigate sign-in or sign-up page this loader will redirect user to homepage

export const authPageLoader = () => {
  const currentUser = getCurrentUserFromLocalStorage();

  if (currentUser) {
    return redirect("/");
  }

  return null;
};

// redirect non-auth user to sign in page

export const privatePageLoader = () => {
  const currentUser = getCurrentUserFromLocalStorage();

  if (!currentUser) {
    return redirect("/sign-in");
  }

  return null;
};

// redirect non-admin user to homepage

export const adminPageLoader = () => {
  const currentUser = getCurrentUserFromLocalStorage();

  if (!currentUser?.isAdmin) {
    return redirect("/");
  }

  return null;
};
