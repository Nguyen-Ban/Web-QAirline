import { createContext, useState } from "react";

export const AuthContext = createContext({
  id: "",
  username: "",
  email: "",
  role: "",
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
