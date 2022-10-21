import style from "./Header.module.css";
import {Link} from "react-router-dom";
import logo from "../../image/logo.png"

const Header =()=>{
    return(
        <div className={style.header}>
            <div className={style.header_home}>
                <Link to={"/"} className={style.home}>Home</Link>
            </div>
            <span className={style.header_logo_settings}>
            <div>
                <img src={logo} alt="logo" className={style.header_logo} />
            </div>
            <div className={style.button_down}>
                <div className={style.button_settings}>Settings</div>
                <div className={style.button_settings_content}>
                <Link to={"/sign-in"} className={style.home}>SignIn</Link>
                <Link to={"/sign-up"} className={style.home}>SignUp</Link>
                   <a href="#">Log Out</a>
                </div>
            </div>
            </span>
        </div>
    )
}

export default Header;