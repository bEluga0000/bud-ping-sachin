import { useNavigate } from "react-router-dom"
import logo from "../../public/logo.png"
import style from "../styles/hover.module.css"
export default function Logo(){
    const navigate = useNavigate()
    return(
        <div style={{width:"100%"}} className={style.hovers} onClick={()=>{
            navigate("/dashboard")
        }}>
            <img src={logo} alt="logo" style={{width:"100%",cursor:"pointer"}}/>
        </div>
    )
}