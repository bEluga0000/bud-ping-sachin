import { Contact2 } from "lucide-react";

export default function FiledFriend()
{
    return(
        <div style={{ display: "flex", gap: "3rem", fontSize: "2rem", cursor: "pointer"}}>
            <div>
                <Contact2 />
            </div>
            <div onClick={()=>{

            }}>
                Friends
            </div>
        </div>
    )
}