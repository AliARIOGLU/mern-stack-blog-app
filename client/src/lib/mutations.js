import { signin, signout } from "./api";
import {
  setSignInFailure,
  // setSignInFailure,
  setSignInStart,
  setSignInSuccess,
  setSignoutSuccess,
} from "../redux/user/userActions";
import { useMutation } from "@tanstack/react-query";

export const useSignOut = () => {
  return useMutation({
    mutationFn: () => signout(),

    onSuccess: () => {
      setSignoutSuccess();
    },
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: (data) => signin(data),
    onMutate: () => {
      setSignInStart();
    },
    onSuccess: (data) => {
      setSignInSuccess(data);
    },
    onError: (error) => {
      const errorMessage = error.message.split(":")[1];
      setSignInFailure(errorMessage);
    },
  });
};
