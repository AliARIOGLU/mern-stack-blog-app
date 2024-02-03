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

export const useGetPostsById = (id, page) => {
  return useQuery({
    queryKey: ["posts", { id }, page],
    queryFn: () => {
      const limit = page * 9;

      return getPostsById(id, limit);
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
