import SingleChat from "./singleChat";
import style from "../styles/allPages.module.css"
export default function ChatList()
{
    return(
        <div style={{overflowY:"scroll"}} className={style.room}>
            <SingleChat/>
            <SingleChat/>
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat/>
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
            <SingleChat />
        </div>
    )
}