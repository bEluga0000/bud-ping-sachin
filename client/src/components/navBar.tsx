import Logo from "./logo";
import SearchCompo from "./searchCompo";
import UserProfile from "./userProfile";
export default function NavBar()
{
    return(
        <div style={{display:"flex",height:"15vh",alignItems:"center",justifyContent:"space-between",padding:".3rem"}}>
            <div style={{width:"20%",cursor:"pointer"}}>
                <Logo/>
            </div>
            <div style={{ border:"2px solid #0F1035",borderRadius:"10px"}}>
                <UserProfile/>
            </div>
            <div>
                <SearchCompo/>
            </div>
        </div>
    )
}