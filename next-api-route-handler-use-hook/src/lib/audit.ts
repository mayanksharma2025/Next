import { connectDB } from "./db";
import { AuditLog } from "../models/AuditLog";
import { ObjectId, Types } from "mongoose";

interface AuditInput {
    action: string;
    userId?: string | Types.ObjectId;
    role?: string;
    ip?: string;
    userAgent?: string;
}

export async function auditLog(data: AuditInput) {
    try {
        await connectDB();
        await AuditLog.create(data);
    } catch (err) {
        // audit failure must NEVER break auth flow
        console.error("Audit log failed:", err);
    }
}
