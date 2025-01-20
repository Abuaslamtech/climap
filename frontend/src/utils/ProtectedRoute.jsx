import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const token = localStorage.getItem(token);
  console.log(token);
  if (token) {
    setisAuthenticated(true);
  } else {
    setisAuthenticated(false);
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
