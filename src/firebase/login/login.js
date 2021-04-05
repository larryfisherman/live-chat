import React from "react";
import "./login.css";
import GoogleButton from "react-google-button";

import { auth, provider } from "../firebase";

function login() {
  const logIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="loginWindow">
        <h1>Welcome!</h1>
        <span>Log in to Live Chat!</span>
        <GoogleButton
          className="loginWindow__loginButton"
          type="light"
          onClick={logIn}
        />
      </div>
    </div>
  );
}

export default login;
