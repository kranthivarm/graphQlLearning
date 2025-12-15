// const express=require('express');
// const {ApolloServer}=require('@apollo/server')
// const {expressMiddleware}=require('@apollo/server/express4')
// const cors=require('cors');
// const bodyParser=require("body-parser")
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const cors = require('cors');
const {default:axios} = require('axios')


async function startServer() {
    const app=express();
    const GraphApoloserver=new ApolloServer({
        typeDefs:`
            type User{
                id:ID!
                username:String!
                email:String!
                name:String
                phone:String
            }
            type Todo{
                id:ID!
                title:String!
                complete:Boolean
                userId:ID!
                user:User
            }
            type Query{
                getTodos:[Todo]
                getAllUsers:[User]
                getUser(id:ID!):User
            }
        `,
        resolvers:{
            Todo:{
                user:async (todo)=>
                    (await axios.get(`https://jsonplaceholder.typicode.com/user/${todo.userId}`)).data,
            },
            Query:{
                getTodos :async ()=>
                    (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getAllUsers :async ()=>
                    (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getUser :async (parent,{id})=>
                    (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
            }
        },
    })

    await GraphApoloserver.start()
    // app.use(cors());
    // app.use(bodyParser.json())
    app.use(
            '/graphql',
            cors(),
            express.json(),
            expressMiddleware(GraphApoloserver)
    )
    app.listen(8000,()=>console.log("Server Started"))
}
startServer()