import { createPost, signin, signout, signup } from "./api";
import {
  setSignInFailure,
  // setSignInFailure,
  setSignInStart,
  setSignInSuccess,
  setSignoutSuccess,
} from "../redux/user/userActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data) => signup(data),
    onError: (error) => {
      return error;
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post) => createPost(post),

    onSettled: async (_, error) => {
      if (error) {
        return error;
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      }
    },
  });
};
