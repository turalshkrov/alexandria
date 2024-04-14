import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/hook";

export default function PrivateRoute() {
  const userRole = useAppSelector(state => state.userSlice.role);
  return userRole == 'admin' ? <Outlet /> : <Navigate to="/account" />;
}