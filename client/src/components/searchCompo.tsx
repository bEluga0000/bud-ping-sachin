import { Search } from "lucide-react";
import style from "../styles/hover.module.css"
export default function SearchCompo()
{
    return(
        <div style={{border:"2px solid black",padding:".5rem",borderRadius:"100%",cursor:"pointer"}} className={style.hovers}>
            <Search/>
        </div>
    )
}