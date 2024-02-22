import { storeMessages } from "../query/create";
import { RedisSubscriptionManager } from "../redis/redis"
export const wsOnconnection = (ws: any, req: any) => {
    // const wsId = counter++;
    ws.on("message", (message: string) => {

        const data = JSON.parse(message.toString());
        if (data.type === "join") {
            RedisSubscriptionManager.getInstance().subscribe(data.payload.id.toString(), data.payload.roomId, ws);
        }
        // Username is taken as userId in payload we are sending the userId insted of username and here its represeted as username
        if (data.type === 'message') {
            const roomId = data.payload.roomId
            const message = data.payload.message
            const sentBy = data.payload.sentBy
            RedisSubscriptionManager.getInstance().addChatMessage(roomId, message, sentBy);
            storeMessages({roomId:roomId,msg:message,sentId:sentBy})

        }
        if (data.type === 'exit') {
            const roomId = data.payload.roomId
            const uId = data.payload.id.toString()
            RedisSubscriptionManager.getInstance().unsubscribe(uId, roomId)
        }
    })
}