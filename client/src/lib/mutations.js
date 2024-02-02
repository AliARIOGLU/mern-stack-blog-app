import {
  createComment,
  createPost,
  deleteComment,
  editComment,
  likeComment,
  signin,
  signout,
  signup,
} from "./api";
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

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createComment(data),

    onSettled: async (_, error) => {
      if (error) {
        return error;
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["comments"],
        });
      }
    },
  });
};

export const useEditComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment) => editComment(comment),

    onSettled: async (_, error, comment) => {
      if (error) {
        return error;
      } else {
        await queryClient.invalidateQueries({ queryKey: ["comments"] });
        await queryClient.invalidateQueries({
          queryKey: ["comments", { id: comment._id }],
        });
      }
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteComment(id),

    onSettled: async (_, error) => {
      if (error) {
        return error;
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["comments"],
        });
      }
    },
  });
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => likeComment(id),

    onSettled: async (_, error) => {
      if (error) {
        return error;
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["comments"],
        });
      }
    },
  });
};
