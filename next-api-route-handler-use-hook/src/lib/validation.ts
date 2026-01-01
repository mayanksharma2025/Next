export function requireString(
    value: unknown,
    field: string,
    minLength = 1
): string {
    if (typeof value !== "string" || value.length < minLength) {
        throw new Error(
            `${field} must be at least ${minLength} characters`
        );
    }
    return value;
}

export function requireEmail(value: unknown): string {
    if (
        typeof value !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
        throw new Error("Invalid email address");
    }
    return value;
}
