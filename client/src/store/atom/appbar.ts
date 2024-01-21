import { atom } from "recoil";

export const appBarState = atom<{isChat:boolean,isFriends:boolean,isFR:boolean}>({
    key:"appbarState",
    default:{
        isChat:true,
        isFR:false,
        isFriends:false
    }
})