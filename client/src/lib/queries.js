import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getComments,
  getCommentsById,
  getPosts,
  getPostsById,
  getUserById,
  getUsers,
} from "./api";

// Users

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["users", { id }],
    queryFn: () => getUserById(id),
  });
};

// Posts

export const useGetPosts = (query) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(query),
  });
};

export const useGetPostsById = (userId, page, postId) => {
  return useQuery({
    queryKey: ["posts", { id: userId }, page],
    queryFn: () => {
      const limit = page * 9;
      const query = {
        userId,
        limit,
        postId,
      };

      return getPostsById(query);
    },
    placeholderData: keepPreviousData,
  });
};

// Comments

export const useGetComments = () => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(),
  });
};

export const useGetCommentsById = (id) => {
  return useQuery({
    queryKey: ["comments", { id }],
    queryFn: () => getCommentsById(id),
  });
};
