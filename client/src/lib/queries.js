import { useQuery } from "@tanstack/react-query";
import { getComments, getPosts, getUsers } from "./api";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });
};

export const useGetComments = () => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(),
  });
};
