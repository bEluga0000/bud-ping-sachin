"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsOnconnection = void 0;
const create_1 = require("../query/create");
const redis_1 = require("../redis/redis");
const wsOnconnection = (ws, req) => {
    // const wsId = counter++;
    ws.on("message", (message) => {
        const data = JSON.parse(message.toString());
        if (data.type === "join") {
            redis_1.RedisSubscriptionManager.getInstance().subscribe(data.payload.id.toString(), data.payload.roomId, ws);
        }
        // Username is taken as userId in payload we are sending the userId insted of username and here its represeted as username
        if (data.type === 'message') {
            const roomId = data.payload.roomId;
            const message = data.payload.message;
            const sentBy = data.payload.sentBy;
            redis_1.RedisSubscriptionManager.getInstance().addChatMessage(roomId, message, sentBy);
            (0, create_1.storeMessages)({ roomId: roomId, msg: message, sentId: sentBy });
        }
        if (data.type === 'exit') {
            const roomId = data.payload.roomId;
            const uId = data.payload.id.toString();
            redis_1.RedisSubscriptionManager.getInstance().unsubscribe(uId, roomId);
        }
    });
};
exports.wsOnconnection = wsOnconnection;
