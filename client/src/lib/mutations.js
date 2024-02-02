import { signout } from "./api";
import { setSignoutSuccess } from "../redux/user/userActions";
import { useMutation } from "@tanstack/react-query";

export const useSignOut = () => {
  return useMutation({
    mutationFn: () => signout(),

    onSuccess: () => {
      setSignoutSuccess();
    },
  });
};
