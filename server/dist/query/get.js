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
exports.getAllRooms = exports.getAllUser = exports.getSuggestionUsers = exports.getRoom = exports.getUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id
        },
        include: {
            rooms: {
                include: {
                    subscribedUser: true
                }
            }
        }
    });
    if (user) {
        // console.log(user)
        return { user, room: user.rooms };
    }
    else {
        return null;
    }
});
exports.getUser = getUser;
const getRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield prisma.room.findUnique({
        where: {
            id
        },
        include: {
            subscribedUser: true,
            messages: true
        }
    });
    // console.log(room)
    return { room: room, subscribedUsers: room.subscribedUser, messages: room.messages };
});
exports.getRoom = getRoom;
const getSuggestionUsers = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            throw new Error("No user with this id");
        }
        const friendsforSuggestion = yield prisma.user.findMany({
            where: {
                id: {
                    notIn: [...user.friends, ...user.requests, user.id]
                }
            }
        });
        if (friendsforSuggestion.length === 0) {
            return null;
        }
        console.log("I ma runningjskdhaj");
        console.log(friendsforSuggestion);
        return friendsforSuggestion;
    }
    catch (e) {
        // console.log(e)
        return null;
    }
});
exports.getSuggestionUsers = getSuggestionUsers;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({
        include: {
            rooms: true
        }
    });
    console.log(users);
});
exports.getAllUser = getAllUser;
const getAllRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield prisma.room.findMany({
        include: {
            subscribedUser: {
                select: {
                    username: true
                }
            }
        }
    });
    // return { paper, question: (paper as any).questions }
    console.log(rooms.subscribedUser, rooms);
});
exports.getAllRooms = getAllRooms;
// getSuggestionUsers({id:"clrrrzkww0000wbfj5sjr7sv4"})
// getUser("clrrrzkww0000wbfj5sjr7sv4")
// getAllUser()
(0, exports.getAllRooms)();
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
