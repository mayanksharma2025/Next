// app/actions/user.actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function createUser(
    formData: FormData
): Promise<void> {
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));

    await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
    });

    revalidatePath("/users");
}



export async function deleteUser(formData: FormData) {
    const id = formData.get('id')

    await fetch(`http://localhost:3000/api/users?id=${id}`, {
        method: 'DELETE',
    })

    revalidatePath('/users')
}

export async function editUser(formData: FormData) {
    const id = Number(formData.get('id'))
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    await fetch(`http://localhost:3000/api/users`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, email }),
    })

    revalidatePath('/users')
}