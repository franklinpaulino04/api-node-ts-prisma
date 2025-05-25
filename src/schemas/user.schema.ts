import { z } from 'zod';

/**
 * User DTOs Schema
 */

export const createUserDto = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    role: z.enum(['user', 'admin'], { message: 'Role must be either user or admin' }).optional(),
});

export const updateUserDto = createUserDto.partial();

export type CreateUserDto = z.infer<typeof createUserDto>;
export type UpdateUserDto = z.infer<typeof updateUserDto>;

/**
 * User Response DTO Schema
 */

export const userResponseDTO = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.enum(['user', 'admin']),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type UserResponseDto = z.infer<typeof userResponseDTO>;