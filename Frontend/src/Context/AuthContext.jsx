import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token") || false
  );

  const login = (tokenValue) => {
    setToken(tokenValue);
    localStorage.setItem("token", tokenValue);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  );
};
