import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // if no token → redirect to login
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;