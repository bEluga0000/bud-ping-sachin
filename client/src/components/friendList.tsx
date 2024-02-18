import { CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { chain } from "../consfig"
import style from "../styles/allPages.module.css"
import SingleFriend from "./singleFriend"
interface FriendProps{
    username:string
    id:string
}
export default function FriendsList({friends}:{friends:string[]|undefined}){
    console.log(friends)
    const [friend,setFriend] = useState<FriendProps[]>([])
    const [isLoading,setIsLoading] = useState<boolean>(false)
    useEffect(()=>{
        const init = ()=>{
            setIsLoading(true)
            if(friends && friends.length > 0)
            {
                friends.map(async(id)=>{
                    const user = await chain("query")({
                        getUser:[{
                            id
                        },{
                            username:true,
                            id:true
                            
                        }]
                    })
                    if(user.getUser)
                    {
                        const oneuser = user.getUser 
                        // console.log(friend)
                        setFriend((prevFriend)=>[...prevFriend,oneuser])
                    }
                })
            }
            setIsLoading(false)
        }
        init();
    },[])
    if(isLoading)
    {
        return <CircularProgress/>
    }
    if(friend.length == 0 && !isLoading)
    {
        return <div className={style.room}>
            <Typography>Make friends and expirence</Typography>
        </div>
    }
    return <div className={style.room}>
        {
            friend.map((frnd)=>{
                return <SingleFriend username={frnd.username} id={frnd.id}/>
            })
        }
    </div>
}