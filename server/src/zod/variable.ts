import {z} from "zod"
export const friendVars = z.object({
    user1Id:z.string(),
    user2Id:z.string()
})
export const requestVars = z.object({
    fromId:z.string(),
    toId:z.string()
})