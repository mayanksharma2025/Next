import { connectDB } from "./db";
import { AuditLog } from "../models/AuditLog";

interface AuditInput {
    action: string;
    userId?: string;
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
