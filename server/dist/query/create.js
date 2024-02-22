"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeMessages = exports.createRoom = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("i am running");
    const user = yield prisma.user.create({
        data: {
            username: inputs.username,
            email: inputs.email,
            password: inputs.password,
        }
    });
    if (user) {
        console.log(user);
        return user;
    }
    else {
        console.log("error in creating the user");
    }
});
exports.createUser = createUser;
const createRoom = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield prisma.room.create({
        data: {
            subscribedUser: {
                connect: [
                    { id: inputs.user1Id },
                    { id: inputs.user2Id }
                ]
            }
        }
    });
    if (room) {
        return room;
    }
    else {
        throw new Error("Error in creating the room");
    }
});
exports.createRoom = createRoom;
// todo while storing the message we need to check weather that user in the room or not
const storeMessages = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield prisma.message.create({
        data: {
            roomId: inputs.roomId,
            msg: inputs.msg,
            sentBy: inputs.sentId
        }
    });
    if (message) {
        console.log(message);
        return message.id;
    }
    else {
        throw new Error("Error in storing the message");
    }
});
exports.storeMessages = storeMessages;
// storeMessages({ roomId: "ef1adf3a-203f-441c-9141-d01c5a18d98a", sentId:"clrrrzkww0000wbfj5sjr7sv4",msg:"Hello jnson how are"})
// createUser({username:"Sachin1",password:"Scahin",email:"Sachin1@gamil.com"})
