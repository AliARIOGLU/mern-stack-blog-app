import { useQuery } from "@tanstack/react-query";
import { getComments, getPosts, getPostsById, getUsers } from "./api";

// Users

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};

// Posts

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });
};

export const useGetPostsById = (id) => {
  return useQuery({
    queryKey: ["posts", { id }],
    queryFn: () => getPostsById(id),
  });
};

// Comments

export const useGetComments = () => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(),
  });
};
