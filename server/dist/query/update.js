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
exports.setRequests = exports.removeFriend = exports.removeFriends = exports.addFriend = void 0;
const client_1 = require("@prisma/client");
const create_1 = require("./create");
const prisma = new client_1.PrismaClient();
const addFriend = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user1 = yield prisma.user.findUnique({
        where: {
            id: input.user1Id,
        },
    });
    const user2 = yield prisma.user.findUnique({
        where: {
            id: input.user2Id
        },
    });
    if (user1 && user2) {
        const updatedRequested1 = user1.requests.filter((id) => id !== input.user2Id);
        const updatedRequested2 = user2.requests.filter((id) => id !== input.user1Id);
        const updatedUser1 = yield prisma.user.update({
            where: {
                id: input.user1Id
            },
            data: {
                friends: [...user1.friends, input.user2Id],
                requests: {
                    set: updatedRequested1
                }
            }
        });
        const updatedUser2 = yield prisma.user.update({
            where: {
                id: input.user2Id
            },
            data: {
                friends: [...user2.friends, input.user1Id],
                requests: { set: updatedRequested2 }
            }
        });
        const room = yield (0, create_1.createRoom)({ user1Id: updatedUser1.id, user2Id: updatedUser2.id });
        // console.log(room)
        // console.log(updatedUser1)
        // console.log(updatedUser2.friends,updatedUser2.id)
        return room;
    }
});
exports.addFriend = addFriend;
const removeFriends = (input) => __awaiter(void 0, void 0, void 0, function* () {
    // todo need to optimise the code if possible directly from the prisma do else we can optimise like this like getuser FUnction and fileter function and may more which are repeated more
    const user1 = yield prisma.user.findUnique({
        where: {
            id: input.user1Id,
        },
    });
    const user2 = yield prisma.user.findUnique({
        where: {
            id: input.user2Id
        },
    });
    if (user2 && user1) {
        //deleting the rooms
        const room = yield prisma.room.deleteMany({
            where: {
                subscribedUser: {
                    every: {
                        id: {
                            in: [input.user1Id, input.user2Id]
                        }
                    }
                }
            }
        });
        const updatedUser1Friends = user1.friends.filter((id) => { id !== input.user2Id; });
        const updatedUser2Friends = user2.friends.filter((id) => { id !== input.user1Id; });
        // removing the friends
        const updatedUser1 = yield prisma.user.update({
            where: {
                id: input.user1Id
            },
            data: {
                friends: { set: updatedUser1Friends }
            }
        });
        const updatedUser2 = yield prisma.user.update({
            where: {
                id: input.user2Id
            },
            data: {
                friends: { set: updatedUser2Friends }
            }
        });
        // console.log(updatedUser2,updatedUser1,room)
        return room;
    }
});
exports.removeFriends = removeFriends;
const removeFriend = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user1 = yield prisma.user.findUnique({
        where: {
            id: input.user1Id,
        },
    });
    const user2 = yield prisma.user.findUnique({
        where: {
            id: input.user2Id,
        },
    });
    if (user1 && user2) {
        const updatedUser1Friends = user1.friends.filter(id => id !== input.user2Id);
        const updatedUser2Friends = user2.friends.filter(id => id !== input.user1Id);
        // Update user friends
        const updatedUser1 = yield prisma.user.update({
            where: {
                id: input.user1Id,
            },
            data: {
                friends: {
                    set: updatedUser1Friends,
                },
            },
        });
        const updatedUser2 = yield prisma.user.update({
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
        const deletedRooms = yield prisma.room.deleteMany({
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
});
exports.removeFriend = removeFriend;
const setRequests = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    const toUser = yield prisma.user.findUnique({
        where: {
            id: inputs.toId
        }
    });
    const alreadyRequested = toUser === null || toUser === void 0 ? void 0 : toUser.requests.includes(inputs.fromId);
    if (alreadyRequested) {
        console.log("error is because of me");
        return null;
    }
    else {
        if (toUser) {
            const updatedUser = yield prisma.user.update({
                where: {
                    id: inputs.toId
                }, data: {
                    requests: [...toUser.requests, inputs.fromId]
                }
            });
            // console.log(updatedUser)
            return updatedUser;
        }
    }
});
exports.setRequests = setRequests;
// addFriend({ user1Id: "clrrrzkww0000wbfj5sjr7sv4", user2Id:"clrrupm77000046gexb5qc96i"})
// removeFriend({ user1Id: "clrrrzkww0000wbfj5sjr7sv4", user2Id: "clrrupm77000046gexb5qc96i" })
