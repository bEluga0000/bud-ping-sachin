import { PrismaClient } from "@prisma/client";
import { RoomInputsProps, UserInputProps } from "../types/typesPrisma";
const prisma = new PrismaClient()

export const createUser = async(inputs:UserInputProps)=>{
    console.log("i am running")
    const user =await prisma.user.create({
        data:{
            username:inputs.username,
            email:inputs.email,
            password:inputs.password,
        }
    })
    if (user) {
        console.log(user)
        return user
    }
    else {
        console.log("error in creating the user")
    }
}

export const createRoom = async(inputs:RoomInputsProps)=>{
    const room = await prisma.room.create({
        data:{
            subscribedUser:{
                connect:[
                    {id:inputs.user1Id},
                    {id:inputs.user2Id}
                ]
            }
        }
    })
    if(room){
        return room
    }
    else
    {
        throw new Error ("Error in creating the room")
    }
}

// createUser({username:"Sachin1",password:"Scahin",email:"Sachin1@gamil.com"})