import style from "../styles/messages.module.css"
export default function ChatSection()
{
    return(
        <div style={{display:"flex",flexDirection:"column"}}>
            <div className={`${style.message} ${style.sent}`} style={{border:"1px solid black"}}>
                <p className={`${style.messageText} `}>Hi hello</p>
                <p className={style.messageTime}>11.22</p>
            </div>
            <div className={`${style.message} ${style.recived}`}>
                <p className={`${style.messageText} `}>Hi hello</p>
                <p className={style.messageTime}>11.22</p>
            </div>
            <div className={`${style.message} ${style.recived}`}>
                <p className={`${style.messageText} `}>Hi hello</p>
                <p className={style.messageTime}>11.22</p>
            </div>
            <div className={`${style.message} ${style.sent}`} style={{ border: "1px solid black" }}>
                <p className={`${style.messageText} `}>Hi hello hwo ar ehow long hav enbe in this palce on Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque aspernatur labore, dolores corporis neque reprehenderit minus cupiditate qui, eaque quas praesentium impedit illo atque. Perspiciatis ab magni unde expedita ducimus delectus iste maiores nihil corporis? Laudantium sequi placeat voluptatibus. Facere perspiciatis, inventore sequi cum soluta eveniet quisquam nostrum nulla magni.</p>
                <p className={style.messageTime}>11.22</p>
            </div>

        </div>
    )
}