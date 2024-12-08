import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { LoginAPI } from "../../services/API/Auth";
import { message, notification } from "antd";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitBtn = async () => {
    const { email, password } = loginData;

    if (!email || !password) {
      notification.error({
        message: "Error",
        description: "Email and Password are required",
      });
      return;
    }

    const res = await LoginAPI(email, password);
    console.log(res);

    if (res.data) {
      message.success("Login Successfully");
      localStorage.setItem("access_token", res.data.token);
      navigate("/");
    } else {
      notification.error({
        message: "Login Failed",
        description: JSON.stringify(res.message),
      });
    }
  };

  return (
    <div className="login-form">
      <form>
        <h2 className="login-title">Admin</h2>
        <div className="input-box">
          <span className="icon">Icon</span>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>
        <div className="input-box">
          <span className="icon">Icon</span>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <div className="submit-btn" onClick={handleSubmitBtn}>
          Login
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
