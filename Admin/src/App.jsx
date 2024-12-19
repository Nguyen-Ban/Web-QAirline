import { useContext, useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Outlet } from "react-router-dom";
import Header from "./components/ui/header/Header";
import Sidebar from "./components/ui/sidebar/Sidebar";
import { getAccountAPI } from "./services/API/Auth";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    if (res) {
      setUser(res);
      console.log(res);
    }
  };

  return (
    <div className="page-wrapper">
      <Sidebar />

      <div className="content-wrapper">
        <Header />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
