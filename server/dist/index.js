"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const config_1 = require("./config");
const path = __importStar(require("path"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const resolver_1 = require("./resolver");
const variable_1 = require("./zod/variable");
const update_1 = require("./query/update");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const fs = require('fs');
const server = http_1.default.createServer(app);
const PORT = config_1.port || 3000;
const schemaString = fs.readFileSync(path.join(__dirname, './schema.gql'), 'utf-8');
const schema = (0, graphql_1.buildSchema)(schemaString);
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema,
    rootValue: resolver_1.root,
    graphiql: true
}));
app.get('/', (req, res) => {
    res.json({ message: "Welcome u loser" });
});
app.post("/addFriend", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInputs = variable_1.friendVars.safeParse(req.body);
    if (!parsedInputs.success) {
        res.status(401).json({ message: "Enter valid Inputs" });
    }
    else {
        const { user1Id, user2Id } = parsedInputs.data;
        const room = yield (0, update_1.addFriend)({ user1Id, user2Id });
        if (room) {
            res.status(200).json({ room });
        }
        else {
            res.status(403).json({ message: "There is a error in adding in room" });
        }
    }
}));
// ? while hitting this route remeber were getting the room.count if it 1 room delted if 0 then room not found
app.patch("/removeFriend", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInputs = variable_1.friendVars.safeParse(req.body);
    if (!parsedInputs.success) {
        res.status(401).json({ message: 'Enter valid inputs' });
    }
    else {
        const { user1Id, user2Id } = parsedInputs.data;
        const room = yield (0, update_1.removeFriend)({ user1Id, user2Id });
        if (room) {
            res.status(201).json({ room });
        }
        else {
            res.status(403).json({ message: "error in removing friend" });
        }
    }
}));
app.post("/sendRequest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInputs = variable_1.requestVars.safeParse(req.body);
    if (!parsedInputs.success) {
        res.status(403).json({ message: "Enter the valid inputs" });
    }
    else {
        const { fromId, toId } = parsedInputs.data;
        const updatedUser = yield (0, update_1.setRequests)({ fromId, toId });
        if (updatedUser) {
            res.status(200).json({ updatedUser });
        }
        else {
            res.status(401).json({ message: "Error in sending requests" });
        }
    }
}));
server.listen(PORT, () => {
    console.log("Welcome to Bud-Ping here is your list of servers running");
    console.log(`Main:-  http://localhost:${PORT}`);
    console.log(`Graphql server : http://localhost:${PORT}/graphql`);
});
