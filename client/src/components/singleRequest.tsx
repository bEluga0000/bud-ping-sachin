import { Typography } from "@mui/material";
import axios from "axios";
import { Loader, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { BASE_URL } from "../consfig";
import { userIdState } from "../store/selector/userselector";

export default function SingleRequest({ username, id }: { username: string, id: string }) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hide, setHide] = useState<boolean>(false)
    const currentUserId = useRecoilValue(userIdState)
    const acceptRequest = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post(`${BASE_URL}/addFriend`, {
                user1Id: currentUserId,
                user2Id: id

            })
            if (res.data) {

                setHide(true)
            }
            else {
                throw new Error("Something went wrong")
            }

        } catch (e) {
            console.log(e)
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <div style={{ display: hide ? "none" : "block" }}>
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
                        border: "none", borderRadius: "10px", padding: ".3rem 1rem", display: "flex", gap: ".3rem", backgroundColor: "#294B29", color: "#DBE7C9"
                    }} id={id} onClick={() => {
                        acceptRequest()
                    }}>
                        <Typography fontSize={"20px"} >
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