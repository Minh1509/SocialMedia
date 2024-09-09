import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css"
import {  Button } from "@material-ui/core";

function Register() {
  const [loginName, setLoginName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  
  const handleRegistration = async () => {
    if(passWord !== confirmPassword) {
       setRegistrationError("Mật khẩu không trùng khớp");
       return;
    }

    const formData = {
      loginName,
      passWord,
      firstName,
      lastName,
      location,
      description,
      occupation,
    };

    const response = await axios.post(
      "http://localhost:8081/api/credential/register",
      formData
    );

    if (response.data.success) {
      setRegistrationSuccess(true);
    } else {
      setRegistrationError("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
    }
  };
  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />
        {registrationError && <p className="error-message">{registrationError}</p>}
        {registrationSuccess && (
          <p className="success-message">
            Registration successful !
          </p>
        )}
        <button onClick={handleRegistration}>Register</button>
        <div className="back-link">
          <Link to="/login">
            <Button type = "submit">Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
