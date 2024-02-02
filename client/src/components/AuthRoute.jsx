import { useCurrentUser } from "../redux/user/userActions";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const AuthRoute = () => {
  const { currentUser } = useCurrentUser();

  return currentUser ? <Navigate to="/" /> : <Outlet />;
};
