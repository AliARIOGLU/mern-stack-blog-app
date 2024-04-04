import { store } from "../store";
import { useSelector } from "react-redux";
import { userActions } from "./userSlice";

export const useCurrentUser = () => useSelector((state) => state.user);

export const setSignInStart = () => store.dispatch(userActions.signInStart());
export const setSignInSuccess = (payload) =>
  store.dispatch(userActions.signInSuccess(payload));
export const setSignInFailure = (payload) =>
  store.dispatch(userActions.signInFailure(payload));

export const setUpdateStart = () => store.dispatch(userActions.updateStart());
export const setUpdateSuccess = (payload) =>
  store.dispatch(userActions.updateSuccess(payload));
export const setUpdateFailure = (payload) =>
  store.dispatch(userActions.updateFailure(payload));

export const setDeleteUserStart = () =>
  store.dispatch(userActions.deleteUserStart());
export const setDeleteUserSuccess = () =>
  store.dispatch(userActions.deleteUserSuccess());
export const setDeleteUserFailure = (payload) =>
  store.dispatch(userActions.deleteUserFailure(payload));

export const setSignoutSuccess = () =>
  store.dispatch(userActions.signoutSuccess());

export const setErrorReset = () => store.dispatch(userActions.errorReset());
