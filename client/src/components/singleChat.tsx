import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SingleChat({roomId,username}:{roomId:string,username:string})
{
    const navigate = useNavigate();
    return(
        <div>
            <div style={{cursor:"pointer"}} onClick={()=>{
                navigate(`/chat/${roomId}`)
            }}
            id={roomId}>
                <Typography variant="h4">{username}</Typography>
            </div>
            <div>
                last Message
            </div>
            <hr />
        </div>
    )
}