import { Typography } from "@mui/material";
import Unlock from "../components/unlock";
import icon from "../../public/logo.png"
import NavBar from "../components/navBar";
// import AppBar from "../components/appBar";
// import { useNavigate } from "react-router-dom";
export default function LandingPage() {
    // const navigate = useNavigate()
    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            <div>
                <NavBar username="Loser"/>
                <hr/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center", height: "101vh", gap: "4rem"}}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "50%" }}>
                        <img src={icon} alt="" style={{ width: "100%" }} />
                    </div>
                    <div>
                        <Typography variant="h2">Bud Ping</Typography>
                    </div>
                </div>
                <div>
                    <Unlock />
                </div>
            </div>
        </div>
    )
}