import { Typography } from "@mui/material";
import axios from "axios";
import { Check, Loader, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { BASE_URL } from "../consfig";
import { userIdState } from "../store/selector/userselector";

export default function SingleSuggestion({ username, id }: { username: string, id: string }) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const currentUserId = useRecoilValue(userIdState)
    const [sent, setSent] = useState<boolean>(false)
    const sendRequest = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post(`${BASE_URL}/sendRequest`, {
                fromId: currentUserId,
                toId: id
            })
            if (res.data) {
                setSent(true)
            }
            else {
                throw new Error("Sometthing went wrong")

            }
        } catch (e) {
            console.log(e)
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "1rem", gap: "1rem" }}>
                <div>
                    <div style={{ cursor: "pointer" }}>
                        <Typography variant="h4">{username}</Typography>
                    </div>

                    <Typography>{32} Mutual</Typography>
                </div>
                <div>
                    <button style={{
                        background: "none", alignItems: "center", cursor: "pointer",
                        border: "none", borderRadius: "10px", padding: ".3rem 1rem", display: "flex", gap: ".3rem", backgroundColor: sent ? "#294B29" : "#FDE767", color: "#DBE7C9"
                    }} id={id}
                        disabled={isLoading}
                        onClick={() => {
                            if (!isLoading || sent) {
                                sendRequest()
                            }
                        }}>
                        <Typography fontSize={"20px"} >
                            {!isLoading && sent && < Check />}
                            {!isLoading && <UserRoundPlus />}
                            {isLoading && <Loader />}
                        </Typography>
                        {/* <Typography variant="h6">Add Friend</Typography> */}
                    </button>
                </div>
                {/* 219C90 D71313*/}
            </div>
            <hr />
        </div>

    )
}