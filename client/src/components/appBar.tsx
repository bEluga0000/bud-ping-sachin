import { useRecoilValue, useSetRecoilState } from "recoil"
import { appBarState } from "../store/atom/appbar"
import { isChatSection, isFriendsSection, isFrSection } from "../store/selector/appbarSelectors"
import style from "../styles/appBar.module.css"
export default function AppBar()
{
    const setSections = useSetRecoilState(appBarState)
    const chatSection  = useRecoilValue(isChatSection)
    const frSection = useRecoilValue(isFrSection)
    const friendsSection = useRecoilValue(isFriendsSection)
    return(
        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center", padding: "0 .3rem",height:'8vh',fontSize:"20px",gap:"1rem"}}>
            <div style={{ cursor: "pointer", padding: ".3rem .5rem", borderRadius: "10px", backgroundColor: chatSection ?"#92C7CF":"white"}} className={style.fields} onClick={()=>{
                setSections({
                    isChat:true,
                    isFR:false,
                    isFriends:false
                })
            }}>
                Chats
            </div>
            <div style={{ cursor: "pointer", padding: ".3rem .5rem", borderRadius: "10px", backgroundColor: friendsSection ? "#92C7CF" : "white"}} className={style.fields} onClick={() => {
                setSections({
                    isChat: false,
                    isFR: false,
                    isFriends: true
                })
            }}>
                Friends
            </div>
            <div style={{ cursor: "pointer", padding: ".3rem .5rem", borderRadius: "10px", backgroundColor: frSection ? "#92C7CF" : "white" }} className={style.fields} onClick={() => {
                setSections({
                    isChat: false,
                    isFR: true,
                    isFriends: false
                })
            }}>
                Friend Request
            </div>
        </div>
    )
}