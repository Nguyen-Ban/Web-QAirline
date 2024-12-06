import { useContext, useEffect } from "react";
import "./App.css";
import { ThemeContext } from "./contexts/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./components/ui/header/Header";
import Sidebar from "./components/ui/sidebar/Sidebar";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

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
