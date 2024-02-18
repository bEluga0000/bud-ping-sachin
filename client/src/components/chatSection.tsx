import { Typography } from "@mui/material"
import { useRecoilValue } from "recoil"
import { userIdState } from "../store/selector/userselector"
import style from "../styles/messages.module.css"
interface MessageProps {
    id: string
    time: string
    msg: string
    sentBy:string
}
export default function ChatSection({messsage}:{messsage:MessageProps[]})
{
    const currentUserId = useRecoilValue(userIdState)
    console.log(currentUserId)
    if (messsage.length === 0) {
        return <div style={{ overflowY: "scroll" }} className={style.room}> 
        <Typography >Say Hello to ur buddy</Typography>
        </div>
    }
    return(
        <div style={{display:"flex",flexDirection:"column"}}>
            {
                messsage.map((msg) => {
                    if (msg.sentBy === currentUserId)
                    {
                        return <div className={`${style.message} ${style.sent}`} style={{ border: "1px solid black" }}>
                            <p className={`${style.messageText} `}>{msg.msg}</p>
                            <p className={style.messageTime}>{msg.time}</p>
                        </div>
                    }
                    else
                    {
                        return <div className={`${style.message} ${style.recived}`}>
                            <p className={`${style.messageText} `}>{msg.msg}</p>
                            <p className={style.messageTime}>{msg.time}</p>
                        </div>
                    }
                })
            }
        </div>
    )
}