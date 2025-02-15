import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export const RoleProtectedRoute = ({
  children,
  allowedRoles,
}: RoleProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role ?? "")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
