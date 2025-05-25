import { ZodSchema } from 'zod';

export const toDTO = <T>(schema: ZodSchema<T>, data: unknown): T => {
    return schema.parse(data);
};

export const toDTOList = <T>(schema: ZodSchema<T>, list: unknown[]): T[] => {
    return list.map((item) => schema.parse(item));
};