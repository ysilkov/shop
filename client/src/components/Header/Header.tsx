import style from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../image/logo.png";
import home from "../../image/home.png";
import basket from "../../image/basket.png";
import setting from "../../image/setting.png"
import { removeUser } from "../../store/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import Cookies from "js-cookie";

interface HeaderProps{
email: string | null
}
const Header =(props: HeaderProps)=>{
    const dispatch = useAppDispatch();
    const logOut = () =>{
        dispatch(removeUser());
        Cookies.remove("user");
    }
    const { token} = useAppSelector((state) => state.auth);
    return(
        <div className={style.header}>
            <div className={style.header_home}>
                <Link to={"/"} className={style.home}>
                <img src={home} alt="Home" className={style.header_logo_home} />
                </Link>
            </div>
            <span className={style.header_menu}>
            <div className={style.header_logo_block}>
                <img src={logo} alt="Logo" className={style.header_logo_logo} />
                <p className={style.header_username}>{props.email}</p>
            </div> 
            <div className={style.header_logo_basket}>
                <img src={basket} alt="Basket" className={style.header_logo_basket} />
            </div>
            {token === null ? 
            <div className={style.button_menu_down}>
                <img className={style.button_menu} src={setting} alt="Setting" />
                <div className={style.button_menu_content}>
                <Link to={"/sign-in"} className={style.home}>Sign In</Link>
                <Link to={"/sign-up"} className={style.home}>Sign Up</Link>
                </div>
            </div> :
             <div className={style.button_menu_down}>
             <img className={style.button_menu} src={setting} alt="Setting" />
             <div className={style.button_menu_content}>
             <Link to={"/sign-in"} className={style.home}>Settings</Link>
             <Link to={"/sign-up"} className={style.home}>Contact</Link>
             <Link to={"/sign-in"} onClick={()=>logOut()}>Log Out</Link>
             </div>
         </div>
            }
            </span>
        </div>
    )
}

export default Header;