import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
// import AppBar from "../components/appBar";
import ChatSection from "../components/chatSection";
import ChatSend from "../components/chatSend";
import NavBar from "../components/navBar";
// import { MoreVertical } from "lucide-react";
import VerticalOptions from "../components/verticalOptions";
import { chain } from "../consfig";
import { usernameState } from "../store/selector/userselector";
import style from "../styles/allPages.module.css";
interface MessageProps {
    id: string
    time: string
    msg: string
}
export default function Chat() {
    const [roomName, setRoomName] = useState<string>("")
    const [roomId, setRoomId] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [messages, setMessages] = useState<MessageProps[]>([])
    const currentUsername = useRecoilValue(usernameState)
    const { roomIds } = useParams()
    useEffect(() => {
        const init = async (id: string) => {
            setLoading(true)
            const room = await chain("query")({
                getRoom: [{
                    id
                }, {
                    id: true,
                    subscribedUser: {
                        username: true
                    },
                    messages: {
                        id: true,
                        time: true,
                        msg: true
                    }
                }]
            })
            if (room.getRoom) {
                console.log(room.getRoom)
                if (room.getRoom.messages && room.getRoom.messages.length > 0) {
                    setMessages(room.getRoom.messages)
                }
                setRoomId(room.getRoom.id)
                setRoomName(room.getRoom.subscribedUser[0].username === currentUsername ? room.getRoom.subscribedUser[1].username : room.getRoom.subscribedUser[0].username)
            }
            setLoading(false)
        }
        console.log(roomIds)
        if (roomIds) {
            console.log("I am getting the roomId loser")
            init(roomIds)
        }
    }, [roomIds])
    if (loading) {
        return <CircularProgress />
    }
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
                {
                    currentUsername &&
                    <NavBar username={currentUsername} />
                }
                <hr />
            </div>
            <div id={roomId} style={{ height: "90vh", backgroundColor:"#B5C0D0"}}>
                <div style={{ display: "flex", alignItems: "center", width: "100wh" }}>
                    <div style={{ minWidth: "80%", textAlign: "center" }}>
                        <Typography variant="h4">{roomName}</Typography>
                    </div>
                    <div style={{ width: "20%", textAlign: "right", paddingRight: ".3rem" }}>
                        <VerticalOptions />
                    </div>
                </div>
                <div style={{ height: "80%", overflowY: "auto", display: "flex", flexDirection: "column-reverse", padding: "10px" }} className={style.scrools}>
                    <ChatSection messsage={messages} />
                </div>
                <div style={{ width: "100wh", height: "7%", marginBottom: "1%" }}>
                    <ChatSend />
                </div>

            </div>
        </div>
    )
}