import SingleRequest from "./singleRequest"
import style from "../styles/allPages.module.css"
// import { useState } from "react"
import { useEffect, useState } from "react"
import { chain } from "../consfig"
import { CircularProgress, Typography } from "@mui/material"
import { useRecoilValue } from "recoil"
import { userIdState } from "../store/selector/userselector"
import SingleSuggestion from "./singleSuggestion"
import LandingPage from "../pages/LandingPage"
interface userRequestProps{
    username:string
    id:string
}
export default function Requests()
{
    const [requests,setRequests] = useState<string[]>([])
    const currentUserId = useRecoilValue(userIdState)
    const[userRequests,setUserRequests] = useState<userRequestProps[]>([])
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const[userSuggestions,setUserSugggestion] = useState<userRequestProps[]>([])
    if(!currentUserId)
    {
        return <LandingPage/>
    }
    useEffect(()=>{
        const init = async () =>{
            setIsLoading(true)
            const oneuser = await chain("query")({
                getUser: [{
                    id:currentUserId
                }, {  
                    requests: true,
                    
                }]
            })
            if (oneuser.getUser && oneuser.getUser.requests) {
                setRequests(oneuser.getUser.requests)
            }
            setIsLoading(false)
        }
        init()
    },[currentUserId])
    useEffect(()=>{
        setIsLoading(true)
        const init = async()=>{
            if (requests && requests.length > 0) {
                requests.map(async (id) => {
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
                        setUserRequests((prevRequests) => [...prevRequests, oneuser])
                    }
                })
            }
            if (currentUserId) {

                const suggestionUsers = await chain("query")({
                    getAllUser: [{
                        id: currentUserId
                    }, {
                        username: true,
                        id: true
                    }]
                })
                if (suggestionUsers.getAllUser && suggestionUsers.getAllUser.length > 0) {
                    setUserSugggestion(suggestionUsers.getAllUser)
                }
            }
            setIsLoading(false)
        }
        init()
    },[requests])
    
    if(isLoading)
    {
        return <CircularProgress/>
    }
    if(userRequests.length == 0 && !isLoading && userSuggestions.length == 0)
    {
        return <div className={style.room} style={{ overflowY: "scroll" }}>
            <Typography>No Friend Request</Typography>
        </div>
    }
 return(
     <div className={style.room} style={{ overflowY: "scroll" }}>
         {
             userRequests.map((user)=>{
                 return   <SingleRequest username={user.username} id={user.id}/>
             })
         }
         <hr />
         <Typography>Suggestion</Typography>
         {
             userSuggestions.map((user)=>{
                 return <SingleSuggestion username={user.username} id={user.id}/>
             })
         }
         
     </div>
 )   
}