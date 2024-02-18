export interface UserInputProps{
    username:string,
    email:string,
    password:string
}
export interface FriendInputProps{
    user1Id:string
    user2Id:string
}
export interface RoomInputsProps{
    user1Id: string
    user2Id: string
}
export interface RequestProps{
    fromId:string
    toId:string
}
export interface StoreMessageProps{
    roomId:string
    msg:string
    sentId:string
}