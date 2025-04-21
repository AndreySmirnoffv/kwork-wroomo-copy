import { User } from "../models/user.model.js";
import { s3, BUCKET_NAME } from "../services/s3.bucket.service.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
export async function uploadImage(uuid, avatar) {
    const base64Data = avatar.split(",")[1];
    if (!base64Data) {
        throw new Error("Invalid avatar data");
    }
    const key = `avatars/${uuidv4()}_${Date.now()}.jpg`;
    try {
        await s3.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: Buffer.from(base64Data, "base64"),
            ContentType: "image/jpg",
            ACL: "public-read",
        }));
        const avatarUrl = `https://${BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
        await new User().updateUser(uuid, { avatarUrl });
        return avatarUrl;
    }
    catch (error) {
        throw new Error(`Error uploading avatar to S3 ${error}`);
    }
}
//# sourceMappingURL=s3.js.map