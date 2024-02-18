import express from "express"
import http from "http"
import { port } from "./config"
import * as path from 'path'
import {WebSocketServer} from "ws"
import {graphqlHTTP} from 'express-graphql'
import {buildSchema} from 'graphql'
import { root } from "./resolver"
import {  friendVars, requestVars } from "./zod/variable"
import { addFriend, removeFriend, setRequests } from "./query/update"
import { wsOnconnection } from "./ws/wsConnection"

const app = express()
app.use(express.json())
const fs = require('fs')
const server = http.createServer(app)
const PORT = port || 3000
const wss = new WebSocketServer({server})
const schemaString = fs.readFileSync(path.join(__dirname,'./schema.gql'),'utf-8');
const schema = buildSchema(schemaString)

wss.on('connection',(ws,req)=>{
    ws.send("connected sucessfully")
    wsOnconnection(ws,req)
})

app.use('/graphql',graphqlHTTP({
    schema,
    rootValue:root,
    graphiql:true
}))
app.get('/',(req,res)=>{
    res.json({message:"Welcome u loser"})
})
app.post("/addFriend",async(req,res)=>{
    const parsedInputs = friendVars.safeParse(req.body)
    if(!parsedInputs.success)
    {
        res.status(401).json({message:"Enter valid Inputs"})
    }
    else
    {
        const {user1Id,user2Id} = parsedInputs.data
        const room = await addFriend({user1Id,user2Id})
        if( room)
        {
            res.status(200).json({room})
        }
        else
        {
            res.status(403).json({message:"There is a error in adding in room"})
        }
    }
})

// ? while hitting this route remeber were getting the room.count if it 1 room delted, if 0 then room not found
app.patch("/removeFriend",async(req,res)=>{
    const parsedInputs = friendVars.safeParse(req.body)
    if(!parsedInputs.success)
    {
        res.status(401).json({message:'Enter valid inputs'})
    }
    else
    {
        const {user1Id,user2Id} = parsedInputs.data
        const room = await removeFriend({user1Id,user2Id})
        if(room)
        {
            res.status(201).json({room})
        }
        else
        {
            res.status(403).json({message:"error in removing friend"})
        }
    }
})

app.post("/sendRequest",async(req,res)=>{
    const parsedInputs = requestVars.safeParse(req.body)
    if(!parsedInputs.success)
    {
        res.status(403).json({message:"Enter the valid inputs"})
    }
    else
    {
        const{fromId,toId} = parsedInputs.data
        const updatedUser = await setRequests({fromId,toId})
        if(updatedUser)
        {
            res.status(200).json({updatedUser})
        }
        else
        {
            res.status(401).json({message:"Error in sending requests"})
        }
    }
})

server.listen(PORT,()=>{
    console.log("Welcome to Bud-Ping here is your list of servers running")
    console.log(`Main:-  http://localhost:${PORT}`)
    console.log(`Graphql server : http://localhost:${PORT}/graphql`)
    console.log(`websocket :- ws://localhost:${PORT}`)
})


