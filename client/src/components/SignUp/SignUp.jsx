import React from "react";
import style from "./SignUp.module.css";
import {Link} from "react-router-dom"

const SignUp = () =>{
    return(
        <div className={style.main}>
    <h1>Sign Up</h1>
    <form >
    <label className={style.fullName}>
    <p>full name:</p>
    <input type="text" name="name" />
  </label>
    <label className={style.username}>
    <p>username:</p>
    <input type="text" name="name" />
  </label>
  <label className={style.password}>
    <p>password:</p>
    <input type="text" name="name" />
  </label>
  <button type="submit">Submit</button>
  <div className={style.sign_up}>
  <Link to={"/sign-in"}>Sign In</Link>
  </div>
    </form>
</div>
    )
}

export default SignUp;