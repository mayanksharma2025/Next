import bcrypt from "bcryptjs";
import { connectDB } from "../db";
import { User } from "../../models/User";

export async function registerUser(email: string, password: string) {
    await connectDB();

    const exists = await User.findOne({ email });
    if (exists) {
        throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await User.create({
        email,
        password: passwordHash,
    });
}
