import mongoose, { Schema, models } from "mongoose";

export interface IAuditLog {
    action: string;
    userId?: string;
    role?: string;
    ip?: string;
    userAgent?: string;
    createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
    {
        action: { type: String, required: true },
        userId: { type: String },
        role: { type: String },
        ip: { type: String },
        userAgent: { type: String },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export const AuditLog =
    models.AuditLog || mongoose.model("AuditLog", AuditLogSchema);
