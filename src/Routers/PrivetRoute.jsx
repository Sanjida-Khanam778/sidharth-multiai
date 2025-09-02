import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRoute({ children }) {
  // Retrieve auth data from localStorage
  const Data = useSelector((state) => state.auth);
  const location = useLocation();
  // Check if user is not authenticated
  if (!Data.access && !Data.refresh) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user is not verified
  if (!Data.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User meets all requirements
  return children;
}