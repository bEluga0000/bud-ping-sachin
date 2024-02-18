import { CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { chain } from "../consfig"
import LandingPage from "../pages/LandingPage"
import { userIdState } from "../store/selector/userselector"
import style from "../styles/allPages.module.css"
import SingleFriend from "./singleFriend"
interface FriendProps{
    username:string
    id:string
}
export default function FriendsList(){
    const[friends,setFriends] = useState<string[]>([])
    const [friend,setFriend] = useState<FriendProps[]>([])
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const currentUserId = useRecoilValue(userIdState)
    if(!currentUserId)
    {
        return <LandingPage/>
    }
    useEffect(()=>{
        const init =async ()=>{
            setIsLoading(true)
            const oneuser = await chain("query")({
                getUser: [{
                    id:currentUserId
                }, {
                    friends: true
                }]
            })
            if(oneuser.getUser && oneuser.getUser.friends !== undefined)
            {
                setFriends(oneuser.getUser.friends)
            }
            if(friends && friends.length > 0)
            {
                // console.log("I")
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
    },[currentUserId])

    useEffect(()=>{
        const init =async ()=>{
            setIsLoading(true)
            if (friends && friends.length > 0) {
                // console.log("I")
                friends.map(async (id) => {
                    const user = await chain("query")({
                        getUser: [{
                            id
                        }, {
                            username: true,
                            id: true

                        }]
                    })
                    if (user.getUser) {
                        const oneuser = user.getUser
                        // console.log(friend)
                        setFriend((prevFriend) => [...prevFriend, oneuser])
                    }
                })
            }
            setIsLoading(false)
        }
        init()
    },[friends])
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