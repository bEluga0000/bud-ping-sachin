import logo from "../../public/logo.png"
import style from "../styles/hover.module.css"
export default function LandingPageNavBar() {
    return (
        <div style={{ display: "flex", height: "8vh", alignItems: "center", justifyContent: "space-between", padding: ".3rem" }}>
            <div style={{ width: "20%", cursor: "pointer" }}>
                <div style={{ width: "100%" }} className={style.hovers} >
                    <img src={logo} alt="logo" style={{ width: "100%", cursor: "pointer" }} />
                </div>
            </div>
        </div>
    )
}