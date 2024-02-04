import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../redux/user/userActions";

export const AdminRoute = () => {
  const { currentUser } = useCurrentUser();

  return currentUser?.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />;
};
