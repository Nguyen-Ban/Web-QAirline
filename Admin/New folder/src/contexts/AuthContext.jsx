import { createContext, useState } from "react";

export const AuthContext = createContext({
  email: "",
  // username: "",
  id: "",
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState({
    email: "admin@gmail.com",
    // username: "",
    id: "",
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
