import { Typography } from "@mui/material";
import Unlock from "../components/unlock";
import icon from "../../public/logo.png"
// import { useNavigate } from "react-router-dom";
export default function LandingPage()
{
    // const navigate = useNavigate()
    return(
        <div style={{display:'flex',flexDirection:'column',alignItems:"center",justifyContent:"center",height:"100vh",gap:"4rem"}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center"}}>
                <div style={{width:"50%"}}>
                    <img src={icon} alt="" style={{width:"100%"}}/>
                </div>
                <div>
                    <Typography variant="h2">Bud Ping</Typography>
                </div>
            </div>
            <div>
                <Unlock/>
            </div>
        </div>
    )
}