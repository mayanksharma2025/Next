import mongoose, { Schema } from "mongoose";

const AuditLogSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            index: true,
            required: true,
        },
        action: {
            type: String,
            required: true,
            index: true,
        },
        resource: {
            type: String,
            required: true,
        },
        ip: String,
        userAgent: String,
        metadata: Schema.Types.Mixed,
    },
    { timestamps: true }
);

export const AuditLog =
    mongoose.models.AuditLog ||
    mongoose.model("AuditLog", AuditLogSchema);
