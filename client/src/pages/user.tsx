import { Typography } from "@mui/material"
import FriendList from "../components/fieldFriend"
import Lock from "../components/fieldLock"
import NavBar from "../components/navBar"
// import style from "../styles/allPages.module.css"
export default function User()
{
    return(
        <div style={{ display: "flex", flexDirection: "column" ,height:"100vh"}} >
            <div>
                <NavBar username="Loser"/>
                <hr />
            </div>
            
            <div>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
                        <div style={{ width: "50px", border: "2px solid black", height: "50px", borderRadius: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px" }}>
                            S
                        </div>
                        <div>
                            <Typography variant="h4" style={{textDecoration:"underline"}}>Username</Typography>
                        </div>
                    </div>
                </div>
                <div>
                    <FriendList/>
                </div>
                <div>
                    <Lock/>
                </div>
            </div>
        </div>
    )
}