import SingleChat from "./singleChat";
import style from "../styles/allPages.module.css"
import { useEffect, useState } from "react";
import { chain } from "../consfig";
import { CircularProgress } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userIdState } from "../store/selector/userselector";
import LandingPage from "../pages/LandingPage";
interface SubscribedUserProps
{
    username:string
    id:string
}
interface RoomsProps{
    id:string
    subscribedUser:SubscribedUserProps[]
}
export default function ChatList()
{
    const currentUserId = useRecoilValue(userIdState)
    const [username,setUsername] = useState<string>("")
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [rooms,setRooms]  = useState<RoomsProps[]>([])
    if(!currentUserId)
    {
        return <LandingPage/>
    }
    useEffect(() => {
        const init = async () => {
            setIsLoading(true)
            const user = await chain("query")({
                getUser: [{
                    id:currentUserId
                }, {
                    id: true,
                    username: true,
                    room: {
                        id: true,
                        subscribedUser: {
                            username: true,
                            id: true
                        }
                    }
                }]
            })
            if(user.getUser !== undefined)
            {
                if(user.getUser.room)
                {
                    setUsername(user.getUser.username)
                    setRooms(user.getUser.room)
                }
                
            }
            setIsLoading(false)
        }
        init();
    }, [])
    if(isLoading)
    {
        return <div style={{ overflowY: "scroll" }} className={style.room}>
            <CircularProgress/>
        </div>
    }
    return(
        <div style={{overflowY:"scroll"}} className={style.room}>
            {
                rooms.map((room)=>{
                    return <SingleChat roomId={room.id} username={ room.subscribedUser[0].username ===username ? room.subscribedUser[1].username:username }/>
                })
            }
            
        </div>
    )
}