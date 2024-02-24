import { Typography } from "@mui/material"
import { useRecoilValue } from "recoil"
import { userIdState } from "../store/selector/userselector"
import style from "../styles/messages.module.css"
import moment from "moment"
interface MessageProps {
    time: string
    msg: string
    sentBy:string
}
export default function ChatSection({messsage}:{messsage:MessageProps[]})
{
    const currentUserId = useRecoilValue(userIdState)
    function converTOTime(input:string)
    {
        const isoDate = moment(input,moment.ISO_8601,true)
        if(isoDate.isValid())
        {
            return isoDate.format('HH:mm')
        }
        else
        {
            const unixTimeStamp = parseInt(input,10)
            {
                const unixTIme = moment(unixTimeStamp).format("HH:mm")
                return unixTIme
            }
        }

    }
    if (messsage.length === 0) {
        return <div style={{ overflowY: "scroll" }} className={style.room}> 
        <Typography >Say Hello to ur buddy</Typography>
        </div>
    }
    return(
        <div style={{display:"flex",flexDirection:"column"}}>
            {
                messsage.map((msg) => {
                    const time = converTOTime(msg.time)
                    if (msg.sentBy === currentUserId)
                    {
                        return <div className={`${style.message} ${style.sent}`} style={{ border: "1px solid black" }}>
                            <p className={`${style.messageText} `}>{msg.msg}</p>
                            <p className={style.messageTime}>{time}</p>
                        </div>
                    }
                    else
                    {
                        return <div className={`${style.message} ${style.recived}`}>
                            <p className={`${style.messageText} `}>{msg.msg}</p>
                            <p className={style.messageTime}>{time}</p>
                        </div>
                    }
                })
            }
        </div>
    )
}