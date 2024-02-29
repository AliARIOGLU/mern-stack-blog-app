import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  deleteUser,
  editComment,
  editPost,
  likeComment,
  signin,
  signout,
  signup,
  terminateUser,
  updateUser,
} from "./api";

import {
  setDeleteUserFailure,
  setDeleteUserStart,
  setDeleteUserSuccess,
  setSignInFailure,
  setSignInStart,
  setSignInSuccess,
  setSignoutSuccess,
  setUpdateFailure,
  setUpdateStart,
  setUpdateSuccess,
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
      setSignInFailure(error.message);
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

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const { postId, userId } = data;
      return deletePost(postId, userId);
    },

    onSettled: async (_, error, variables) => {
      if (error) {
        return error;
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["posts", { id: variables.userId }],
        });
      }
    },
  });
};

export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId, formData }) =>
      editPost(postId, userId, formData),

    onSettled: async (_, error, variables) => {
      if (error) {
        return error;
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["posts", { id: variables.userId }],
        });
      }
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteUser(id),

    onSettled: async (_, error) => {
      if (error) {
        return error;
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      }
    },
  });
};

export const useTerminateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => terminateUser(id),

    onMutate: () => {
      setDeleteUserStart();
    },

    onSettled: async (_, error) => {
      if (error) {
        setDeleteUserFailure(error.message);
        return error;
      } else {
        setDeleteUserSuccess();
        await queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      }
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updateUser(id, formData),

    onMutate: () => {
      setUpdateStart();
    },

    onSettled: async (updatedUser, error, variables) => {
      if (error) {
        setUpdateFailure(error.message);
        return error;
      } else {
        setUpdateSuccess(updatedUser);
        await queryClient.invalidateQueries({
          queryKey: ["users", { id: variables.id }],
        });
      }
    },
  });
};
