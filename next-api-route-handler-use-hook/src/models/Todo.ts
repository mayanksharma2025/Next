import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            index: true,
            required: true,
        },
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Todo =
    mongoose.models.Todo ||
    mongoose.model("Todo", TodoSchema);
