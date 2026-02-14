import { Permission } from "node-appwrite";
import { commentCollection, db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection(){
    // Creating collection
    await databases.createCollection({
        databaseId: db,
        collectionId: commentCollection,
        name: commentCollection,
        permissions: [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users")
        ]
    })

    console.log("Comment collection created")

    // Creating attributes

    await Promise.all([
        databases.createStringAttribute({
            databaseId: db, 
            collectionId: commentCollection,
            key: "content",
            size: 10000,
            required: true
        }),
        databases.createStringAttribute({
            databaseId: db,
            collectionId: commentCollection,
            key: "typeId",
            size: 50,
            required: true
        }),
        databases.createEnumAttribute({
            databaseId: db,
            collectionId: commentCollection,
            key: "type",
            elements: ["answers", "questions"],
            required: true
        }),
        databases.createStringAttribute({
            databaseId: db,
            collectionId: commentCollection,
            key: "authorId",
            size: 50,
            required: true
        })
    ])

    console.log("Comment attributes created")
}