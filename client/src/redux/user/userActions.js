import { store } from "../store";
import { useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signInFailure,
  signInStart,
  signInSuccess,
  signoutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
  errorReset,
} from "./userSlice";

export const useCurrentUser = () => useSelector((state) => state.user);

export const setSignInStart = () => store.dispatch(signInStart());
export const setSignInSuccess = (payload) =>
  store.dispatch(signInSuccess(payload));
export const setSignInFailure = (payload) =>
  store.dispatch(signInFailure(payload));

export const setUpdateStart = () => store.dispatch(updateStart());
export const setUpdateSuccess = (payload) =>
  store.dispatch(updateSuccess(payload));
export const setUpdateFailure = (payload) =>
  store.dispatch(updateFailure(payload));

export const setDeleteUserStart = () => store.dispatch(deleteUserStart());
export const setDeleteUserSuccess = () => store.dispatch(deleteUserSuccess());
export const setDeleteUserFailure = (payload) =>
  store.dispatch(deleteUserFailure(payload));

export const setSignoutSuccess = () => store.dispatch(signoutSuccess());

export const setErrorReset = () => store.dispatch(errorReset());
