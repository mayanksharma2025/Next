export function serializeUser(user: any) {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
    };
}
