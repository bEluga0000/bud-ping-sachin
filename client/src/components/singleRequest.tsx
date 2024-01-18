import { Typography } from "@mui/material";
import {  UserRoundPlus } from "lucide-react";

export default function SingleRequest(){
    return(
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "1rem",gap:"1rem" }}>
                <div>
                    <div style={{ cursor: "pointer" }}>
                        <Typography variant="h4">Username</Typography>
                    </div>

                    <Typography>{32} Mutual</Typography>
                </div>
                <div>
                    <button style={{
                        background: "none", alignItems: "center", cursor: "pointer",
                        border: "none", borderRadius: "10px", padding: ".3rem 1rem", display: "flex", gap: ".3rem", backgroundColor: "#294B29", color:"#DBE7C9"
                    }}>
                        <Typography fontSize={"20px"} ><UserRoundPlus /></Typography>
                        {/* <Typography variant="h6">Add Friend</Typography> */}
                    </button>
                </div>
                {/* 219C90 D71313*/}
            </div>
            <hr />
        </div>
        
    )
}