import SingleChat from "./singleChat";
import style from "../styles/allPages.module.css"
import { useEffect, useState } from "react";
import { chain } from "../consfig";
import { CircularProgress } from "@mui/material";
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
    const [username,setUsername] = useState<string>("")
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [rooms,setRooms]  = useState<RoomsProps[]>([])
    useEffect(() => {
        const init = async (id: string) => {
            setIsLoading(true)
            const user = await chain("query")({
                getUser: [{
                    id
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
        init("clrrrzkww0000wbfj5sjr7sv4");
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
            
            {/* <SingleChat/>
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat/>
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat /> */}
        </div>
    )
}