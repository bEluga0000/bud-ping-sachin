import { string } from "zod"
import { createUser } from "./query/create"
import { getRoom, getSuggestionUsers, getUser } from "./query/get"
import { UserInputProps } from "./types/typesPrisma"
export const root = {
    getUser:async({id}:{id:string},req:any)=>{
        const userFull = await getUser(id)
        if(userFull)
        {
            const user = userFull.user
            const room = userFull.room
            return { id: user.id, username: user.username, email: user.email, userLink: user.userLink, password: user.password, friends: user.friends,requests:user.requests,room:room}
        }
        else
        {
            throw new Error("User not found")
        }
    },
    getRoom:async({id}:{id:string},req:any)=>{
        const {room,subscribedUsers,messages} = await getRoom(id)
        if(room && subscribedUsers && messages)
        {
            return { id: room.id, subscribedAt: room.subscribedAt, subscribedUser:subscribedUsers,messages:messages}
        }
    },
    getAllUser:async({id}:{id:string},req:any)=>{
        const users = await getSuggestionUsers({id})
        if(users)
        {
            return users
        }
    },
    CreateUser: async({ input }:{ input:UserInputProps},req:any)=>{
        const user = await createUser({username:input.username,password:input.username,email:input.email})
        if(user){
            return { id: user.id, username: user.username, email: user.email, userLink: user.userLink, password: user.password, friends: user.friends, requests: user.requests }
        }
        else
        {
            // throw new Error("User not found")
            return null
        }
    }
}