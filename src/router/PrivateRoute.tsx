import { Outlet,Navigate } from "react-router-dom";

type PrivateRouteProps = {
  isAuthenticated: boolean
}

export default function PrivateRoute({ isAuthenticated }: PrivateRouteProps) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}