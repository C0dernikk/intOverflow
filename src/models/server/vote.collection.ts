import { Permission } from "node-appwrite";
import {db, voteCollection } from "../name"
import { databases } from "./config";

export default async function createVoteCollection(){
    // Creating collection
    await databases.createCollection({
        databaseId: db,
        collectionId: voteCollection,
        name: voteCollection,
        permissions: [
            Permission.create("users"),
            Permission.update("users")
            Permission.delete("users")
            Permission.read("any")
        ]
    })

    console.log("Vote Collection created")

    // Creating attributes

    await Promise.all([
        databases.createEnumAttribute({
            databaseId: db,
            collectionId: voteCollection,
            key: "type",
            elements: ["questions", "answers"],
            required: true
        }),
        databases.createEnumAttribute({
            databaseId: db,
            collectionId: voteCollection,
            key: "voteStatus",
            elements: ["upvoted", "downvoted"],
            required: true
        }),
        databases.createStringAttribute({
            databaseId: db,
            collectionId: voteCollection,
            key: "typeId",
            size: 50,
            required: true
        }),
        databases.createStringAttribute({
            databaseId: db,
            collectionId: voteCollection,
            key: "votedById",
            size: 50,
            required: true
        })
    ])

    console.log("Vote attribute created")
}
