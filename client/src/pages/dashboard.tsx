import AppBar from "../components/appBar";
// import ChatList from "../components/chatList";
import NavBar from "../components/navBar";
import Requests from "../components/requests";
export default function Dashboard()
{
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
                {/* <ChatList/> */}
                <Requests/>
            </div>
        </div>
        
    )
}