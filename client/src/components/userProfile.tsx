import { Typography } from "@mui/material";
import { Copy } from "lucide-react";

export default function UserProfile()
{
    return(
        <div style={{display:"flex",alignItems:"center",padding:"0 .5rem"}}>
            <Typography variant="h6" fontWeight={700} borderRight={"1px solid black"} padding={"0 .7em"}>Username</Typography>
            <button style={{ border:"none",backgroundColor:"white",cursor:"pointer",height:"100%",width:"100%"}}>
                <Copy  />
            </button>

        </div>
    )
}