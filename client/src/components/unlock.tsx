import { Button, Typography } from "@mui/material";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { BASE_URL } from "../consfig";
import { userState } from "../store/atom/user";

export default function Unlock() {
    const [disable, setDisable] = useState<boolean>(true)
    const [showPass, setShowPass] = useState(false)
    const currentUser = useSetRecoilState(userState)
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()
    const [errMsg, setErrorMsg] = useState<string | null>(null)
    const getCookie = (name: string) => {
        const cookies = document.cookie.split(';')
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=')
            if (cookieName.trim() === name) {
                return decodeURIComponent(cookieValue)
            }
        }
        return null
    }
    const setCookie = () => {
        const usernameCookie = `username=${encodeURIComponent(username)};expires=${getCookieExpiration(1)}`
        const passwordCookie = `password=${encodeURIComponent(password)};expires=${getCookieExpiration(1)}`
        document.cookie = usernameCookie;
        document.cookie = passwordCookie
    }
    const getCookieExpiration = (days: number) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        return date.toUTCString();
    }
    useEffect(() => {
        if (password.length > 0 && username.length > 0) {
            setDisable(false)
        }
    }, [password, username])
    useEffect(() => {
        const usernameCookieValue = getCookie('username')
        const passwordCookieValue = getCookie('password')
            if(usernameCookieValue !== null)
            {
                setUsername(usernameCookieValue)
            }
            if(passwordCookieValue !== null)
            {
                setPassword(passwordCookieValue)
            }
        console.log(usernameCookieValue, passwordCookieValue)
    }, [])
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", border: "2px solid black", borderRadius: "5px" }}>
                <input type="text" placeholder="email" style={{
                    fontSize: "20px",
                    padding: ".5rem",
                    width: "80%",
                    outline: "none",
                    border: "none"
                }}
                    value={username}
                    onChange={(e) => {
                        // setErrorMsg(null)
                        setUsername(e.target.value)
                    }}
                />
            </div>
            <div style={{ display: "flex", border: "2px solid black", borderRadius: "5px" }}>
                <input type={showPass ? "text" : "password"} placeholder="Password" style={{
                    fontSize: "20px",
                    padding: ".5rem",
                    width: "80%",
                    outline: "none",
                    border: "none"
                }}
                    value={password}
                    onChange={(e) => {
                        // setErrorMsg(null)
                        setPassword(e.target.value)
                    }}
                />
                <button style={{ width: "20%", backgroundColor: "white", outline: "none", border: "none", cursor: "pointer" }} onClick={() => { setShowPass(!showPass) }}>
                    {showPass ? <Eye /> : <EyeOff />}
                </button>
            </div>
            {
                !errMsg && <div>
                    <Typography variant="subtitle1" color={"red"}>
                        {errMsg}
                    </Typography>
                </div>
            }
            <Button variant="contained" style={{ backgroundColor: disable ? "#B5C0D0" : "black", borderRadius: '5px', fontSize: "16px" }}
                disabled={disable}
                onClick={async () => {

                    const res = await axios.post(`${BASE_URL}/unlock`, {
                        username,
                        password
                    })
                    if (res.data) {
                        if (res.data.id && res.data.username) {
                            currentUser({
                                id: res.data.id,
                                username: res.data.username
                            })
                            toast.success(`Welcome ${res.data.username}`)
                            setCookie()
                            navigate(`/dashboard`)
                        }
                        else {
                            setErrorMsg("Fuck u intruder")
                            // toast.error()
                        }
                    }
                    else {
                        setErrorMsg("There is other issue")
                    }

                }}>Unlock</Button>
        </div>
    )
}