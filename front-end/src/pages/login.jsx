import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Please fill out all fields");
    }

    try {
      const url = "https://authentication-app2.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-div">
          <label htmlFor="name">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
            placeholder="Enter your email"
            value={loginInfo.email}
          />
        </div>
        <div className="form-div">
          <label htmlFor="name">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            autoFocus
            placeholder="Enter your password"
            value={loginInfo.password}
          />
        </div>
        <button>Login</button>
        <span>
          Not a user? <Link to="/register">Register Now</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
