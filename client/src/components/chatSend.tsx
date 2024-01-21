import { Send } from "lucide-react";

export default function ChatSend(){
    return(
        <div style={{ maxHeight: "100%", display: "flex", padding: '0px 5px 5px 5px', gap: '5%'}}>
            <input type="text" style={{
                fontSize: '16px', paddingLeft: '5px', width: '75%', outline: 'none', borderRadius: '10px', border: "1px solid black"}}/>
            <button style={{ width: "20%", fontSize: "1rem", borderRadius: '10px',outline:'none',backgroundColor:"white",border:"1px solid black",cursor:"pointer"}}>
                <Send  style={{fontSize:"20x"}}/>
            </button>
        </div>
    )
}