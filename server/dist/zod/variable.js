"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestVars = exports.friendVars = void 0;
const zod_1 = require("zod");
exports.friendVars = zod_1.z.object({
    user1Id: zod_1.z.string(),
    user2Id: zod_1.z.string()
});
exports.requestVars = zod_1.z.object({
    fromId: zod_1.z.string(),
    toId: zod_1.z.string()
});
