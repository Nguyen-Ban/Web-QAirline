import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Thư viện dùng để decode token (cài bằng `npm install jwt-decode`)

const PrivateRoute = (props) => {
  const token = window.localStorage.getItem("access_token");

  // Hàm kiểm tra token hết hạn
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token); // Giải mã token
      const currentTime = Date.now() / 1000; // Lấy thời gian hiện tại (tính bằng giây)
      return decoded.exp < currentTime; // So sánh thời gian hết hạn
    } catch (err) {
      console.error("Invalid token:", err);
      return true; // Token không hợp lệ => coi như hết hạn
    }
  };

  if (token && !isTokenExpired(token)) {
    return <>{props.children}</>;
  }

  // Nếu token hết hạn hoặc không tồn tại => chuyển hướng tới trang đăng nhập
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
