import { PrismaClient } from "@prisma/client";
import { FriendInputProps, RequestProps } from "../types/typesPrisma";
import { createRoom } from "./create";
const prisma =new PrismaClient()

export const addFriend = async(input:FriendInputProps)=>{
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
        const updatedRequested1 = user1.requests.filter((id)=> id!==input.user2Id)
        const updatedRequested2 = user2.requests.filter((id) => id !== input.user1Id)
        const updatedUser1 = await prisma.user.update({
            where: {
                id: input.user1Id
            },
            data: {
                friends: [...user1.friends, input.user2Id],
                requests:{
                    set:updatedRequested1
                }
            }
        })
        const updatedUser2 = await prisma.user.update({
            where:{
                id:input.user2Id
            },
            data:{
                friends:[...user2.friends,input.user1Id],
                requests:{set:updatedRequested2}
            }

        })
        const room = await createRoom({user1Id:updatedUser1.id,user2Id:updatedUser2.id})
        // console.log(room)
        // console.log(updatedUser1)
        // console.log(updatedUser2.friends,updatedUser2.id)
        return room
    }
    
} 

export const removeFriends = async(input:FriendInputProps)=>{
    // todo need to optimise the code if possible directly from the prisma do else we can optimise like this like getuser FUnction and fileter function and may more which are repeated more
    
    const user1 = await prisma.user.findUnique({
        where: {
            id: input.user1Id,
        },
    })
    const user2 = await prisma.user.findUnique({
        where: {
            id: input.user2Id
        },
    })
    if(user2&& user1)
    {
        //deleting the rooms
        const room = await prisma.room.deleteMany({
            where: {
                subscribedUser: {
                    every: {
                        id: {
                            in: [input.user1Id, input.user2Id]
                        }
                    }
                }
            }
        })
        const updatedUser1Friends = user1.friends.filter((id)=>{id!==input.user2Id})
        const updatedUser2Friends = user2.friends.filter((id)=>{id!==input.user1Id})
        // removing the friends
        const updatedUser1 = await prisma.user.update({
            where: {
                id: input.user1Id
            },
            data: {
                friends: {set:updatedUser1Friends}
            }
        })
        const updatedUser2 = await prisma.user.update({
            where:{
                id:input.user2Id
            },
            data:{
                friends:{set:updatedUser2Friends}
            }
        })
        
        // console.log(updatedUser2,updatedUser1,room)
        return room

    }
    
}
export const removeFriend = async (input: FriendInputProps) => {
    const user1 = await prisma.user.findUnique({
        where: {
            id: input.user1Id,
        },
    });

    const user2 = await prisma.user.findUnique({
        where: {
            id: input.user2Id,
        },
    });

    if (user1 && user2) {
        const updatedUser1Friends = user1.friends.filter(id => id !== input.user2Id);
        const updatedUser2Friends = user2.friends.filter(id => id !== input.user1Id);

        // Update user friends
        const updatedUser1 = await prisma.user.update({
            where: {
                id: input.user1Id,
            },
            data: {
                friends: {
                    set: updatedUser1Friends,
                },
            },
        });

        const updatedUser2 = await prisma.user.update({
            where: {
                id: input.user2Id,
            },
            data: {
                friends: {
                    set: updatedUser2Friends,
                },
            },
        });

        // Delete rooms where both users are subscribed
        const deletedRooms = await prisma.room.deleteMany({
            where: {
                subscribedUser: {
                    every: {
                        id: {
                            in: [input.user1Id, input.user2Id],
                        },
                    },
                },
            },
        });

        return deletedRooms;
    }
};

export const setRequests = async(inputs:RequestProps)=>{
    const toUser = await prisma.user.findUnique({
        where:{
            id:inputs.toId
        }
    })
    const alreadyRequested = toUser?.requests.includes(inputs.fromId)
    if(alreadyRequested)
    {
        console.log("error is because of me")
        return null
    }
    else
    {
        if (toUser) {
            const updatedUser = await prisma.user.update({
                where: {
                    id: inputs.toId
                }, data: {
                    requests: [...toUser.requests, inputs.fromId]
                }
            })
            // console.log(updatedUser)
            return updatedUser
        }
    }
} 

// addFriend({ user1Id: "clrrrzkww0000wbfj5sjr7sv4", user2Id:"clrrupm77000046gexb5qc96i"})
// removeFriend({ user1Id: "clrrrzkww0000wbfj5sjr7sv4", user2Id: "clrrupm77000046gexb5qc96i" })
