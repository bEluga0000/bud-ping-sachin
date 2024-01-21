import style from "../styles/allPages.module.css"
import SingleFriend from "./singleFriend"
export default function FriendsList(){
    return <div className={style.room}>
        <SingleFriend/>
    </div>
}