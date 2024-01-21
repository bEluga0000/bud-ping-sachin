import { Typography } from "@mui/material";
import ChatSection from "../components/chatSection";
import ChatSend from "../components/chatSend";
// import { MoreVertical } from "lucide-react";
import VerticalOptions from "../components/verticalOptions";
import style from "../styles/allPages.module.css";
export default function Chat()
{
    return(
        <div  className={style.room}>
            <div style={{display:"flex",alignItems:"center",width:"100wh"}}>
                <div style={{minWidth:"80%",textAlign:"center"}}>
                    <Typography variant="h4">Username</Typography>
                </div>
                <div style={{width:"20%",textAlign:"right",paddingRight:".3rem"}}>
                    <VerticalOptions/>
                </div>
            </div>
            <div style={{ height: "80%", overflowY: "auto", display: "flex", flexDirection: "column-reverse", padding: "10px" }} className={style.scrools}>
                <ChatSection/>
            </div>
            <div style={{width:"100wh",height:"7%",marginBottom:"1%"}}>
                <ChatSend/>
            </div>

        </div>
    )
}