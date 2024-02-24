import { CircularProgress, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
// import AppBar from "../components/appBar";
import ChatSection from "../components/chatSection";
import ChatSend from "../components/chatSend";
import NavBar from "../components/navBar";
// import { MoreVertical } from "lucide-react";
import VerticalOptions from "../components/verticalOptions";
import { chain, WS_URL } from "../consfig";
import { userIdState, usernameState } from "../store/selector/userselector";
import style from "../styles/allPages.module.css";
interface MessageProps {
    time: string
    msg: string
    sentBy: string
}
interface WebsocketMsgProps {
    type: string
    payload: MessageProps
}
export default function Chat() {
    const navigate = useNavigate()
    const currentUserId = useRecoilValue(userIdState)
    const [roomName, setRoomName] = useState<string>("")
    const [roomId, setRoomId] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [messages, setMessages] = useState<MessageProps[]>([])
    const currentUsername = useRecoilValue(usernameState)
    const { roomIds } = useParams()
    const [websocket, setWebsocket] = useState<WebSocket | null>(null)
    // making the ws connection
    useEffect(() => {
        let ws: WebSocket | null = null;

        const initWebSocket = () => {
            ws = new WebSocket(`${WS_URL}`);
            if (currentUserId && roomIds && ws) {
                ws.onopen = () => {
                    ws?.send(
                        JSON.stringify({
                            type: "join",
                            payload: {
                                id: currentUserId,
                                roomId: roomIds,
                            },
                        })
                    );
                };

                ws.onmessage = (event) => {
                    const data: WebsocketMsgProps = JSON.parse(event.data);
                    if (data.type === "message") {
                        setMessages((prevMessages) => [...prevMessages, data.payload]);
                        return data.payload;
                    }
                };
            }
        };

        const cleanupWebSocket = () => {
            if (ws) {
                ws.send(
                    JSON.stringify({
                        type: "exit",
                        payload: {
                            id: currentUserId,
                            roomId: roomIds,
                        },
                    })
                );
                ws.close();
            }
        };

        // Initialize WebSocket
        if (!websocket) {
            initWebSocket();
            setWebsocket(ws);
        }
        return cleanupWebSocket;
    }, [roomIds, currentUserId]);
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
                        time: true,
                        msg: true,
                        sentBy: true,
                    }
                }]
            })
            if (room.getRoom) {
                if (room.getRoom.messages && room.getRoom.messages.length > 0) {
                    setMessages(room.getRoom.messages)
                }
                setRoomId(room.getRoom.id)
                setRoomName(room.getRoom.subscribedUser[0].username === currentUsername ? room.getRoom.subscribedUser[1].username : room.getRoom.subscribedUser[0].username)
            }
            setLoading(false)
        }
        if (roomIds) {
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
            </div>
            <hr style={{ padding: "0px", margin: "0px" }} />
            <div id={roomId} style={{ height: "90vh", backgroundColor: "#F5F7F8" }} >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100wh" }}>
                    <div style={{ textAlign: "left", paddingLeft: ".3rem", cursor: "pointer" }}
                        onClick={() => {
                            navigate("/dashboard")
                        }}
                    >
                        <ArrowLeft />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Typography variant="h4">{roomName}</Typography>
                    </div>
                    <div style={{ textAlign: "right", paddingRight: ".3rem" }}>
                        <VerticalOptions />
                    </div>
                </div>
                <div style={{ height: "80%", overflowY: "auto", display: "flex", flexDirection: "column-reverse", padding: "10px" }} className={style.scrools}>
                    <ChatSection messsage={messages} />
                </div>
                <div style={{ width: "100wh", height: "7%", marginBottom: "1%" }}>
                    <ChatSend ws={websocket} roomId={roomIds} />
                </div>

            </div>
        </div>
    )
}