import { Typography } from "@mui/material";

export default function SingleChat()
{
    return(
        <div>
            <div style={{cursor:"pointer"}}>
                <Typography variant="h4">Username</Typography>
            </div>
            <div>
                last Message
            </div>
            <hr />
        </div>
    )
}