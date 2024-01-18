import { Button } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Unlock(){
    const[showPass,setShowPass] = useState(false)
    return(
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            <div style={{ display: "flex",border:"2px solid black",borderRadius:"5px"}}>
                <input type={showPass ? "Password": "text" } placeholder="Password" style={{
                    fontSize:"20px",
                    padding:".5rem",
                    width:"80%",
                    outline:"none",
                    border:"none"
                }}/>
                <button style={{width:"20%",backgroundColor:"white",outline:"none",border:"none",cursor:"pointer"}} onClick={()=>{setShowPass(!showPass)}}>
                    {showPass ?   <Eye />:<EyeOff />}
                </button>
            </div>
            
            <Button variant="contained" style={{backgroundColor:"black",borderRadius:'5px',fontSize:"16px"}}>Unlock</Button>
        </div>
    )
}