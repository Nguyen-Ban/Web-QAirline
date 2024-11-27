import "./app.css";

import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";

import "./assets/font/stylesheet.css";
import Header from "./components/header/Header";
const App = () => {
  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
