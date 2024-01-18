export default function AppBar()
{
    return(
        <div style={{ display: "flex", alignItems: 'center', justifyContent: "space-between", padding: "0 .3rem",height:'10vh',fontSize:"20px"}}>
            <div style={{cursor:"pointer"}}>
                Chats
            </div>
            <div style={{ cursor: "pointer" }}>
                Friends
            </div>
            <div style={{ cursor: "pointer" }}>
                Friend Request
            </div>
        </div>
    )
}