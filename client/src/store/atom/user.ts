import { atom } from "recoil";

export const userState = atom<{username:string|null,id:string|null}>({
    key:"userState",
    default:{
        username:null,
        id:null
    }
})