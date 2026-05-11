import { createContext, useState } from "react";

// Create global auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Store token in state
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Login function
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};