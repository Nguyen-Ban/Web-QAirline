import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Thư viện dùng để decode token (cài bằng `npm install jwt-decode`)

export const AuthContext = createContext({
  user: {
    id: "",
    username: "",
    email: "",
    role: "",
  },
  login: (token, user) => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
  });

  const [token, setToken] = useState(
    window.localStorage.getItem("access_token")
  );

  const login = (token, userData) => {
    localStorage.setItem("access_token", token);
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser({
      id: "",
      username: "",
      email: "",
      role: "",
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
