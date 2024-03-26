import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/hook";

export default function PrivateRoute() {
  const userRole = useAppSelector(state => state.authSlice.role);
  console.log(userRole);
  
  return userRole == 'admin' ? <Outlet /> : <Navigate to="/not-found" />;
}