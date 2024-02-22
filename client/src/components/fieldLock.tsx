import   { LockIcon }  from 'lucide-react';
import Cookies from 'js-cookie'
import style from "../styles/hover.module.css"
import { useNavigate } from 'react-router-dom';
export default function Lock()
{
    const navigate = useNavigate()
    return(
        <div style={{ border: "2px solid black", padding: ".5rem", borderRadius: "100%", cursor: "pointer" }} className={style.hovers} 
        onClick={()=>{
            Cookies.remove('username')
            Cookies.remove('password')
            navigate('/')
        }}>
                <LockIcon />
        </div>
    )
}