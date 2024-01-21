import { selector } from "recoil";
import { appBarState } from "../atom/appbar";

export const isChatSection = selector({
    key:"isChatSection",
    get:({get})=>{
        const state = get(appBarState)
        return state.isChat
    }
})
export const isFriendsSection = selector({
    key: "isFriendsection",
    get: ({ get }) => {
        const state = get(appBarState)
        return state.isFriends
    }
})
export const isFrSection = selector({
    key: "isFrSection",
    get: ({ get }) => {
        const state = get(appBarState)
        return state.isFR
    }
})