import express from "express"
import http from "http"
import { port } from "./config"
import * as path from 'path'
import {graphqlHTTP} from 'express-graphql'
import {buildSchema} from 'graphql'
import { root } from "./resolver"

const app = express()
const fs = require('fs')
const server = http.createServer(app)
const PORT = port || 3000
const schemaString = fs.readFileSync(path.join(__dirname,'./schema.gql'),'utf-8');
const schema = buildSchema(schemaString)



app.use('/graphql',graphqlHTTP({
    schema,
    rootValue:root,
    graphiql:true
}))
app.get('/',(req,res)=>{
    res.json({message:"Welcome u loser"})
})

server.listen(PORT,()=>{
    console.log("Welcome to Bud-Ping here is your list of servers running")
    console.log(`Main:-  http://localhost:${PORT}`)
    console.log(`Graphql server : http://localhost:${PORT}/graphql`)
})


