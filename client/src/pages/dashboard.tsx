import { useRecoilValue } from "recoil";
import AppBar from "../components/appBar";
import ChatList from "../components/chatList";
import NavBar from "../components/navBar";
import { isChatSection, isFriendsSection, isFrSection } from "../store/selector/appbarSelectors";
import Requests from "../components/requests";
import FriendsList from "../components/friendList";
// import Chat from "./chat";
export default function Dashboard()
{
    const chatSection = useRecoilValue(isChatSection)
    const frSection  = useRecoilValue(isFrSection)
    const friendsSection = useRecoilValue(isFriendsSection)
    return(
        <div style={{display:"flex",flexDirection:"column"}} >
            <div>
                <NavBar />
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
                    frSection && <Requests /> 
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