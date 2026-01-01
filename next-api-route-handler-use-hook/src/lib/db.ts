import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null,
    };
}

export async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, {
                dbName: "next16_app_todos",
            })
            .then(m => {
                console.log("✅ MongoDB connected");
                return m;
            })
            .catch(err => {
                console.error("❌ MongoDB connection error", err);
                throw err;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
