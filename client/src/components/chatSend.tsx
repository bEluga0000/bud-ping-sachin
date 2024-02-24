import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userIdState } from "../store/selector/userselector";

export default function ChatSend({ ws, roomId }: { ws: WebSocket | null, roomId: string | undefined }) {
    const [sendMsg, setSendMsg] = useState<string>("")
    const [isDisable, setIsDisable] = useState<boolean>(true)
    const currentUserId = useRecoilValue(userIdState)
    useEffect(() => {
        if (sendMsg.length > 0) {
            setIsDisable(false)
        }
        else {
            setIsDisable(true)
        }
    }, [sendMsg])
    return (
        <div style={{ maxHeight: "100%", display: "flex", padding: '0px 5px 5px 5px', gap: '5%' }}>
            <input type="text"
                onChange={(e) => {
                    setSendMsg(e.target.value)
                }}
                value={sendMsg}
                style={{
                    fontSize: '16px', paddingLeft: '5px', width: '75%', outline: 'none', borderRadius: '10px', border: "1px solid black"
                }} />
            <button style={{ width: "20%", fontSize: "1rem", borderRadius: '10px', outline: 'none', backgroundColor: "white", border: "1px solid black", cursor: "pointer" }} disabled={isDisable} onClick={() => {
                if (ws && roomId && currentUserId) {
                    ws.send(JSON.stringify({
                        type: "message",
                        payload: {
                            roomId: roomId,
                            sentBy: currentUserId,
                            message: sendMsg
                        }
                    }))
                    setSendMsg("")
                }
            }}>
                <Send style={{ fontSize: "20x" }} />
            </button>
        </div>
    )
}