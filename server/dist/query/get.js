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
exports.getAllRooms = exports.getAllUser = exports.getRoom = exports.getUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id
        }
    });
    if (user) {
        console.log(user);
        return user;
    }
    else {
        return null;
    }
});
exports.getUser = getUser;
const getRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const room1 = yield prisma.room.findUnique({
        where: {
            id
        },
        include: {
            subscribedUser: {
                select: {
                    username: true
                }
            }
        }
    });
    console.log(room1);
});
exports.getRoom = getRoom;
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
// getUser("clrrrzkww0000wbfj5sjr7sv4")
// getAllUser()
(0, exports.getAllRooms)();
(0, exports.getRoom)('1d24522b-9151-4c3f-8f11-3a459b217f32');
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
