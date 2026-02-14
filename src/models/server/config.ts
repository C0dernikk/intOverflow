import env from "@/app/env";
import { Storage, Databases, Avatars, Client, Users} from "node-appwrite"

const client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apikey) // Your secret API key


const databases = new Databases(client) //All the databases created in a project
const avatars = new Avatars(client)
const users = new Users(client)
const storage = new Storage(client)

export {client, databases, avatars, users, storage}