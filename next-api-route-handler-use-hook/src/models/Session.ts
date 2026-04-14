import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    _id: String, // sessionId
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);
