import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export function PrivateRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn, "IsLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="login" />;
  }

  return children;
}
