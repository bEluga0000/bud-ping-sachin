import { useRecoilValue, useSetRecoilState } from "recoil";
import AppBar from "../components/appBar";
import ChatList from "../components/chatList";
import NavBar from "../components/navBar";
import { isChatSection, isFriendsSection, isFrSection } from "../store/selector/appbarSelectors";
import Requests from "../components/requests";
import FriendsList from "../components/friendList";
import { useEffect, useState} from "react";
import { chain } from "../consfig";
import { CircularProgress } from "@mui/material";
import { userState } from "../store/atom/user";
// import axios from "axios";
// import Chat from "./chat";
export default function Dashboard()
{
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [username,setUsername] = useState<string>("")
    const chatSection = useRecoilValue(isChatSection)
    const frSection  = useRecoilValue(isFrSection)
    const friendsSection = useRecoilValue(isFriendsSection)
    const setCurrentUserState = useSetRecoilState(userState)
    useEffect(()=>{
        const init = async(id:string)=>{
            setIsLoading(true)
            const oneuser = await chain("query")({
                getUser:[{
                    id
                },{
                    id:true,
                    username:true,
                }]
            })
            if(oneuser.getUser)
            {
                setUsername(oneuser.getUser.username)
                setCurrentUserState({
                    username:oneuser.getUser.username,
                    id:oneuser.getUser.id
                })
            }
            setIsLoading(false)
        }
        // Jhonson
        // init("clrrupm77000046gexb5qc96i");
        // Sachin
        init("clrrrzkww0000wbfj5sjr7sv4") 
    },[])
    
    if(isLoading)
    {
        return <CircularProgress/>
    }
    return(
        <div style={{display:"flex",flexDirection:"column"}} >
            <div>
                <NavBar username= {username}/>
            </div>
            <div>
                <AppBar/>
            <hr />
            </div>
            <div style={{paddingLeft:"1rem"}}>
                {
                    chatSection && <ChatList />
                }
                {
                    frSection && <Requests/> 
                }
                {
                    friendsSection && <FriendsList/>
                }
                {/* <ChatList/> */}
                {/* <Requests/> */}
                {/* <Chat/> */}
            </div>
        </div>
        
    )
}