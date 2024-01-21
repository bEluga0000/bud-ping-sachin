import logo from "../../public/logo.png"
import style from "../styles/hover.module.css"
export default function Logo(){
    return(
        <div style={{width:"100%"}} className={style.hovers}>
            <img src={logo} alt="logo" style={{width:"100%",cursor:"pointer"}}/>
        </div>
    )
}