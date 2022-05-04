import React from "react";
import { useNavigate } from "react-router";
import { signInWithGoogle } from "../../firebase";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const signInhandler = () => {
    signInWithGoogle();

    navigate("/", { replace: true });
  };
  return (
    <div className={classes.container}>
      <div className={classes.login}>
        <img className={classes.logo} src="/assets/logo.svg" alt="" />

        <div className={classes.form}>
          <h2>Sign in with google</h2>

          <button onClick={signInhandler}>
            <img src="/assets/google-icon.jpg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
