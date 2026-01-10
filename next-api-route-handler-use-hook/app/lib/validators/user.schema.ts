import { z } from 'zod';

export const createUserSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50),

    email: z
        .string()
        .email('Invalid email address'),
});

export const updateUserSchema = createUserSchema.extend({
    id: z
        .string()
        .min(1, 'User ID is required'),
});

export const deleteUserSchema = z.object({
    id: z
        .string()
        .min(1, 'User ID is required'),
});


