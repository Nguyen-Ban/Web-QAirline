import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const token = window.localStorage.getItem("access_token");
  console.log(token);
  if (token) {
    return <>{props.children}</>;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
