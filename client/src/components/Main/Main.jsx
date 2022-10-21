import {Link} from "react-router-dom";
import style from "./Main.module.css"

const Main =()=>{
    return(
        <div>
 <h1>
    Раді вітати на стартовій сторінці сайта!
    Для подальшої роботи на сайті увійдіть до свого облікогово запису або зареєструйтесь на сторінці.
 </h1>
 <div className={style.buttonContainer}>
 <div className={style.buttonContainerBlockSignUp}>
 <Link to={"/sign-up"} className={style.SignUp}>SignUp</Link>
</div>
 <div className={style.buttonContainerBlockSignIn}>
    <Link to={"/sign-in"} className={style.SignIn}>SignIn</Link></div>
 </div>
        </div>
    )
}

export default Main;