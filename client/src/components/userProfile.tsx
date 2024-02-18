import { Typography } from "@mui/material";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import style from "../styles/hover.module.css"
export default function UserProfile({username}:{username:string})
{
    const[copied,setCopied] = useState<boolean>(false)
    return(
        <div style={{display:"flex",alignItems:"center",padding:"0 .5rem"}} >
            <Typography variant="h6" fontWeight={700} borderRight={"1px solid black"} padding={"0 .7em"}>{username}</Typography>
            <button style={{ border: "none", backgroundColor: "white", cursor: "pointer", height: "100%", width: "100%" }} className={style.hovers} onClick={()=>{
                setCopied(true)
                setTimeout(()=>{
                    setCopied(false)
                },3000)
            }}>
                {copied ? <CopyCheck/>:<Copy/>}
            </button>

        </div>
    )
}