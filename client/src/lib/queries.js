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

export const useGetUsers = (currentUser, page) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => {
      const limit = page * 9;
      return getUsers(limit);
    },
    enabled: currentUser?.isAdmin,
    placeholderData: keepPreviousData,
  });
};

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["users", { id }],
    queryFn: () => getUserById(id),
  });
};

// Posts

export const useGetPosts = (searchQuery, page) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => {
      if (page) {
        const limit = page * 9;
        const query = `${searchQuery}&limit=${limit}`;

        return getPosts(query);
      }

      return getPosts(searchQuery);
    },
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

export const useGetComments = (currentUser, page) => {
  return useQuery({
    queryKey: ["comments", page],
    queryFn: () => {
      const limit = page * 9;

      return getComments(limit);
    },
    enabled: currentUser?.isAdmin,
    placeholderData: keepPreviousData,
  });
};

export const useGetCommentsById = (id) => {
  return useQuery({
    queryKey: ["comments", { id }],
    queryFn: () => getCommentsById(id),
  });
};
