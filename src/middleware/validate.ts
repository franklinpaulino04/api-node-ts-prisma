import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const formattedErrors: Record<string, string> = {};

        for (const issue of result.error.issues) {
            const field = issue.path[0];
            if (typeof field === 'string' && !formattedErrors[field]) {
                formattedErrors[field] = issue.message;
            }
        }

        res.status(400).json({
            message: 'Validation failed',
            errors: formattedErrors,
        });
        return;
    }

    next();
};
