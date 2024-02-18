import { Typography } from "@mui/material";
import axios from "axios";
import { Loader } from "lucide-react";
import { UserMinus } from "lucide-react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { BASE_URL } from "../consfig";
import { userIdState } from "../store/selector/userselector";

export default function SingleFriend({username,id}:{username:string,id:string}){
    const[isLoading,setIsLoading] = useState<boolean>(false)
    const currentUserId = useRecoilValue(userIdState)
    const [show,setShow] = useState<boolean>(true)
    return(
        <div style={{display:show? "block" : "none"}}>
            <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "1rem", gap: "1rem" }}>
                <div>
                    <div style={{ cursor: "pointer" }}>
                        <Typography variant="h4">{username}</Typography>
                    </div>

                    <Typography>{32} Mutual</Typography>
                </div>
                <div>
                    <button style={{
                        background: "none", alignItems: "center", cursor: "pointer",
                        border: "none", borderRadius: "10px", padding: ".3rem 1rem", display: "flex", gap: ".3rem", backgroundColor: "#D04848", color: "#DBE7C9"
                    }} id={id} 
                    onClick={async(e)=>{
                        const res = await axios.patch(`${BASE_URL}/removeFriend`,{
                            user1Id:currentUserId,
                            user2Id:e.currentTarget.id
                        })
                        if(res)
                        {
                            setIsLoading(false)
                            setShow(false)
                        }
                        else
                        {
                            setIsLoading(false)
                        }
                    }}>
                        <Typography fontSize={"20px"} >
                            {!isLoading &&<UserMinus />}
                            {isLoading && <Loader />}</Typography>
                        {/* <Typography variant="h6">Add Friend</Typography> */}
                    </button>
                </div>
                {/* 219C90 D71313*/}
            </div>
            <hr />
        </div>
    )
}