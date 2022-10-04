import style from "./SignIn.module.css";
import {Link} from "react-router-dom"

const SignIn = ()=>{
    return(
<div className={style.main}>
    <h1>Sign In</h1>
    <form >
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
  <Link to={"/sign-up"} >Sign Up</Link>
  </div>
    </form>
</div>
    )
}

export default SignIn;