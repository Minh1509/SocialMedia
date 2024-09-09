import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css"

function Login({ onLogin }) {
  const [loginName, setLoginName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/credential/login", {
        loginName,
        passWord,
      });

      if (response.data.success) {
        setLoginError("");
        const userData = response.data.user;
        
        onLogin(userData);
        navigate(`/users/${userData._id}`);
      } else {
        setLoginError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Login Name"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
        />
        {loginError && <p className="error-message">{loginError}</p>}
        <button onClick={handleLogin}>Login</button>
        
      </div>
    </div>
  );
}

export default Login;