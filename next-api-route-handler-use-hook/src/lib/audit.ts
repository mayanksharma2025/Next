import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import { AuditLog } from "@/models/AuditLog";

interface AuditParams {
    userId: string;
    action: string;
    resource: string;
    metadata?: Record<string, unknown>;
}

export async function logAudit({
    userId,
    action,
    resource,
    metadata,
}: AuditParams) {
    const h = headers() as any;

    await connectDB();

    await AuditLog.create({
        userId,
        action,
        resource,
        metadata,
        ip: h.get("x-forwarded-for") ?? "unknown",
        userAgent: h.get("user-agent") ?? "unknown",
    });
}
