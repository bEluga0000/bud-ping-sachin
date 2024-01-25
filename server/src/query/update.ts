import { PrismaClient } from "@prisma/client";
import { AddFriendInputProps } from "../types/typesPrisma";
import { createRoom } from "./create";
const prisma =new PrismaClient()

export const addFriend = async(input:AddFriendInputProps)=>{
    const user1 = await prisma.user.findUnique({
        where:{
            id:input.user1Id,
        },        
    })
    const user2 = await prisma.user.findUnique({
        where:{
            id:input.user2Id
        },
    })
    
    if(user1 && user2){
        const updatedUser1 = await prisma.user.update({
            where: {
                id: input.user1Id
            },
            data: {
                friends: [...user1.friends, input.user2Id]
            }
        })
        const updatedUser2 = await prisma.user.update({
            where:{
                id:input.user2Id
            },
            data:{
                friends:[...user2.friends,input.user1Id]
            }

        })
        const room = await createRoom({user1Id:updatedUser1.id,user2Id:updatedUser2.id})
        console.log(room)
        console.log(updatedUser1)
        console.log(updatedUser2.friends,updatedUser2.id)
        return room
    }
    
} 

// addFriend({ user1Id: "clrrrzkww0000wbfj5sjr7sv4", user2Id:"clrrupm77000046gexb5qc96i"})

