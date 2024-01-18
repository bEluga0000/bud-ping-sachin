import logo from "../../public/logo.png"
export default function Logo(){
    return(
        <div style={{width:"100%"}}>
            <img src={logo} alt="logo" style={{width:"100%",cursor:"pointer"}}/>
        </div>
    )
}