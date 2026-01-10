'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '../lib/mongodb';
import { User } from '../models/User';

export async function createUser(formData: FormData) {
    await connectDB();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    await User.create({ name, email });
    revalidatePath('/users');
}

export async function editUser(formData: FormData) {
    await connectDB();

    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    await User.findByIdAndUpdate(id, { name, email });
    revalidatePath('/users');
}

export async function deleteUser(formData: FormData) {
    await connectDB();

    const id = formData.get('id') as string;
    await User.findByIdAndDelete(id);

    revalidatePath('/users');
}
