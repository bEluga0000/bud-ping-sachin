import { createUser } from "./query/create"
import { getUser } from "./query/get"
import { UserInputProps } from "./types/typesPrisma"
export const root = {
    getUser:async({id}:{id:string},req:any)=>{
        const user = await getUser(id)
        if(user)
        {
            return { id: user.id, username: user.username, email: user.email, userLink: user.userLink, password: user.password, friends: user.friends,requests:user.requests}
        }
        else
        {
            throw new Error("User not found")
        }
    },
    CreateUser: async({ input }:{ input:UserInputProps},req:any)=>{
        console.log(1)
        const user = await createUser({username:input.username,password:input.username,email:input.email})
        console.log(2)
        if(user){
            console.log(user)
            return { id: user.id, username: user.username, email: user.email, userLink: user.userLink, password: user.password, friends: user.friends, requests: user.requests }
        }
        else
        {
            // throw new Error("User not found")
            return null
        }
    }
}