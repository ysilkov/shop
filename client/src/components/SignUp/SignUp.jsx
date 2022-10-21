import React from "react";
import style from "./SignUp.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth } from "../../store/auth";

const SignUp = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [password, setPassword] = useState();
  const data = {
    fullName: fullName,
    email: email,
    password: password,
  };
  const [emailError, setEmailError] = useState(
    "Поштова адреса не може бути пустою"
  );
  const [passwordError, setPasswordError] = useState(
    "Пароль не може бути пустим"
  );
  const dispatch = useDispatch();
  const createUser = () => {
    dispatch(getAuth(data));
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Поштова адреса не коректна");
    } else {
      setEmailError("");
    }
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setPasswordError("Пароль має бути від 3 до 20 символів");
      if (!e.target.value) {
        setPasswordError("Пароль не може бути пустим");
      }
    } else {
      setPasswordError("");
    }
  };
  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
        default:
          break;
    }
  };
  return (
    <div className={style.main}>
      <h1>Sign Up</h1>
      <form>
        <label className={style.fullName}>
          <p>full name:</p>
          <input
            type="text"
            name="name"
            value={fullName || " "}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <label className={style.username}>
          <p>email:</p>
          {emailDirty && emailError && (
            <div className={style.errorMessage}>{emailError}</div>
          )}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => emailHandler(e)}
            onBlur={(e) => blurHandler(e)}
            required
          />
        </label>
        <label className={style.password}>
          <p>password:</p>
          {passwordDirty && passwordError && (
              <div className={style.errorMessage}>{passwordError}</div>
            )}
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => passwordHandler(e)}
            onBlur={(e)=> blurHandler(e)}
            required
          />
        </label>
        <button type="submit" onClick={() => createUser()}>
          Submit
        </button>
        <div className={style.sign_up}>
          <Link to={"/sign-in"}>Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
