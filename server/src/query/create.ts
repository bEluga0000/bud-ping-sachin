import { PrismaClient } from "@prisma/client";
import { RoomInputsProps, StoreMessageProps, UserInputProps } from "../types/typesPrisma";
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
// todo while storing the message we need to check weather that user in the room or not
export const storeMessages = async (inputs: StoreMessageProps) => {
    const message = await prisma.message.create({
        data: {
            roomId:inputs.roomId,
            msg:inputs.msg,
            sentBy:inputs.sentId
        }
    })
    if(message)
    {
        console.log(message)
        return message.id
    }
    else
    {
        throw new Error("Error in storing the message") 
    }
}
// storeMessages({ roomId: "46614326-c6e6-4520-93d2-9ed558de5319", sentId:"clrrrzkww0000wbfj5sjr7sv4",msg:"Hello jnson how are"})
// createUser({username:"Sachin1",password:"Scahin",email:"Sachin1@gamil.com"})