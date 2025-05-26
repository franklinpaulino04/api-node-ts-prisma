import { z } from 'zod';

/**
 * User DTOs Schema
 */

export const createUserSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    role: z.enum(['user', 'admin'], { message: 'Role must be either user or admin' }).optional(),
});

export const updateUserSchema = createUserSchema.partial();

export type createUserDto = z.infer<typeof createUserSchema>;
export type updateUserDto = z.infer<typeof updateUserSchema>;

/**
 * User Response DTO Schema
 */

export const userResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.enum(['user', 'admin']).nullable(),
    isActive: z.boolean().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
});

export type userResponseDto = z.infer<typeof userResponseSchema>;