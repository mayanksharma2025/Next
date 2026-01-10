'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '../lib/mongodb';
import { User } from '../models/User';
import {
    createUserSchema,
    updateUserSchema,
    deleteUserSchema,
} from '../lib/validators/user.schema';
import { parseFormData } from '../lib/validators/parse-form-data';

export type ActionState = {
    error?: string;
    success?: boolean;
};

/* CREATE */
export async function createUser(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const data = parseFormData(formData);
    const result = createUserSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.issues[0].message };
    }

    await connectDB();
    await User.create(result.data);

    revalidatePath('/users');
    return { success: true };
}

/* EDIT */
export async function editUser(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const data = parseFormData(formData);
    const result = updateUserSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.issues[0].message };
    }

    await connectDB();

    const updated = await User.findByIdAndUpdate(
        result.data.id,
        { name: result.data.name, email: result.data.email },
        { new: true }
    );

    if (!updated) {
        return { error: 'User not found' };
    }

    revalidatePath('/users');
    return { success: true };
}

/* DELETE */
export async function deleteUser(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const data = parseFormData(formData);
    const result = deleteUserSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.issues[0].message };
    }

    await connectDB();

    const deleted = await User.findByIdAndDelete(result.data.id);
    if (!deleted) {
        return { error: 'User not found' };
    }

    revalidatePath('/users');
    return { success: true };
}
