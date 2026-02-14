import { answerCollection, db } from "../name";
import { databases } from "./config";
import { Permission } from "node-appwrite";

export default async function createAnswerCollection(){
    // Creating collection

    await databases.createCollection({
        databaseId: db,
        collectionId: answerCollection,
        name: answerCollection,
        permissions: [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users") ],
    })

    console.log("Answers collection created")

    // Creating Attributes

    await Promise.all([
        databases.createStringAttribute({
            databaseId: db,
            collectionId: answerCollection,
            key: "content",
            size: 10000,
            required: true
        }),
        databases.createStringAttribute({
            databaseId: db,
            collectionId: answerCollection,
            key: "questionId",
            size: 50,
            required: true
        }),
        databases.createStringAttribute({
            databaseId: db,
            collectionId: answerCollection,
            key: "authorId",
            size: 50,
            required: true
        })
    ])

    console.log("Answer attributes created")

}