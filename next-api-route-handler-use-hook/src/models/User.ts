import mongoose, { Schema, Types } from "mongoose";

export type UserRole = "user" | "admin";

const UserSchema = new Schema(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            index: true,
        },

        profile: {
            name: String,
            skills: [String],
            address: {
                city: String,
                country: String,
            },
            education: [
                {
                    id: String,
                    school: String,
                    degree: String,
                    year: Number,
                },
            ],
            experience: [
                {
                    id: String,
                    company: String,
                    role: String,
                    years: Number,
                },
            ],
        },
    },
    { timestamps: true }
);

export const User =
    mongoose.models.User ||
    mongoose.model("User", UserSchema);

