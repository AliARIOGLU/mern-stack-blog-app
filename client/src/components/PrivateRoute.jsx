import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../redux/user/userActions";

export const PrivateRoute = () => {
  const { currentUser } = useCurrentUser();

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};
