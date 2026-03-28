// lib/rbac.ts
import type { Role } from "@/app/types";

export function canCreateProject(role: Role) {
  return role === "admin";
}
