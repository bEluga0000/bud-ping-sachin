import SingleRequest from "./singleRequest"
import style from "../styles/allPages.module.css"
export default function Requests()
{
 return(
     <div className={style.room} style={{ overflowY: "scroll" }}>
         <SingleRequest/>
         <SingleRequest />
         <SingleRequest />
         <SingleRequest/>
         <SingleRequest />
         <SingleRequest />
     </div>
 )   
}