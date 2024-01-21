import   { LockIcon }  from 'lucide-react';
export default function Lock()
{
    return(
        <div style={{ display: "flex", gap: "3rem", fontSize: "2rem", cursor: "pointer" }}>
            <div>
                <LockIcon />
            </div>
            <div>
                Lock
            </div>
        </div>
    )
}