import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export const getUser = async (id:string)=>{
    const user =await prisma.user.findUnique({
        where:{
            id
        }
    })
    if(user)
    {
        console.log(user)
        return user
    }
    else{
        return null
    }
}
export const getRoom = async(id:string)=>{
    const room = await prisma.room.findUnique({
        where:{
            id
        },
        include:{
            subscribedUser:true,
            messages:true
            
        }
    })
    // console.log(room)
    return { room: room, subscribedUsers: (room as any).subscribedUser, messages: (room as any).messages}

}
export const getAllUser = async()=>{
    const users = await prisma.user.findMany({
        include:{
            rooms:true
        }
    })
    console.log(users)
}
export const getAllRooms = async()=>{
    const rooms = await prisma.room.findMany({
        include:{
            subscribedUser:{
                select:{
                    username:true
                }
            }
        }
    })
    // return { paper, question: (paper as any).questions }
    console.log((rooms as any).subscribedUser,rooms)
}
// getUser("clrrrzkww0000wbfj5sjr7sv4")
// getAllUser()
// getAllRooms()
// getRoom('46614326-c6e6-4520-93d2-9ed558de5319')

// users
// [
//     {
//         id: 'clrrrzkww0000wbfj5sjr7sv4',
//         username: 'Sachin1',
//         email: 'Sachin1@gamil.com',
//         password: 'Scahin',
//         userLink: '9dcab036-1b0d-41c6-a5af-1c8d624a4c6f',
//         friends: [],
//         requests: []
//     },
//     {
//         id: 'clrrupm77000046gexb5qc96i',
//         username: 'Jonson',
//         email: 'Jonson@gmail.com',
//         password: 'Jonson',
//         userLink: '4e68013c-954c-494e-be39-24552ec2222f',
//         friends: [],
//         requests: []
//     }
// ]
