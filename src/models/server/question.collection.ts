import { IndexType, OrderBy, Permission } from "node-appwrite";
import { db, questionCollection } from "../name";
import { databases } from "./config";
import { permission } from "process";

export default async function createQuestionCollection(){
    // Create collection

    await databases.createCollection({
        databaseId: db,
        collectionId: questionCollection,
        name: questionCollection,
        permissions: [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users") ],
        })

    console.log("Question collection is created!");

    // Creating attributes and Indexes

    await Promise.all([
        databases.createStringAttribute({
            databaseId: db,
            collectionId: questionCollection, 
            key: "title",
            size: 100,
            required: true
        }),
        databases.createStringAttribute({
            databaseId: db,
            collectionId: questionCollection, 
            key: "content",
            size: 10000,
            required: true
        }),
        databases.createStringAttribute({
            databaseId: db,
            collectionId: questionCollection, 
            key: "authorId",
            size: 50,
            required: true
        }),
        databases.createStringAttribute({
            databaseId: db,
            collectionId: questionCollection, 
            key: "tags",
            size: 50,
            required: true,
            array: true
        }),
        databases.createStringAttribute({
            databaseId: db,
            collectionId: questionCollection, 
            key: "attachmentId",
            size: 50,
            required: false
        })
    ]);

    console.log("Question attributes created");

    // Create indexes

    await Promise.all([
        databases.createIndex({
            databaseId: db,
            collectionId: questionCollection,
            key: "title",
            type: IndexType.Fulltext,
            attributes: ["title"],
            orders: [OrderBy.Asc]
        }),
        databases.createIndex({
            databaseId: db,
            collectionId: questionCollection,
            key: "content",
            type: IndexType.Fulltext,
            attributes: ["content"],
            orders: [OrderBy.Asc]
        })
    ])
    
    
}

