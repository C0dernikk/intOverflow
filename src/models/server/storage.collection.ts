import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage} from "./config";
import { Truculenta } from "next/font/google";
import { permission } from "process";

export default async function getOrCreateStorage(){
    try {
        await storage.getBucket(questionAttachmentBucket)
        console.log("Storage connected");
        
    } catch (error) {
        try {
            await storage.createBucket({
                bucketId: questionAttachmentBucket,
                name: questionAttachmentBucket,
                permissions: [
                    Permission.create("users"),
                    Permission.read("any"),
                    Permission.update("users"),
                    Permission.delete("users")
                ],
                fileSecurity: false,
                enabled: undefined,
                maximumFileSize: undefined,
                allowedFileExtensions: ["jpg", "png", "gif", "jpeg", "webp", "heic"]                
            })

            console.log("Storage created");
            console.log("Storage connected");
            
        } catch (error) {
            console.error("Error creating storage:", error);
        }
    }
}