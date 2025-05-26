import { Request, Response } from 'express';

import { UserService } from '../services/user.service';

import { toDTO, toDTOList } from "../utils/transform-response";
import { userResponseSchema } from "../schemas/user.schema";

export class UserController {

    /**
     * Get all users
     * @param req
     * @param res
     */
    static async getAll(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10 } = req.query;

            if (isNaN(+page) || isNaN(+limit)) {
                res.status(400).json({
                    success: false,
                    message: 'Page and limit must be numbers',
                });
            }

            const users = await UserService.findAll({ page: +page, limit: +limit });
            res.json({
                success: true,
                data: toDTOList(userResponseSchema, users.data),
                meta: users.meta,
            });
        } catch {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    /**
     * Get user by ID
     * @param req
     * @param res
     */
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserService.findById(+id);

            if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }

            res.json({
                success: true,
                data: toDTO(userResponseSchema, user),
            });
        } catch {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    /**
     * Create a new user
     * @param req
     * @param res
     */
    static async create(req: Request, res: Response) {
        try {
            const user = await UserService.create(req.body);
            res.status(201).json({
                success: true,
                data: toDTO(userResponseSchema, user),
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    /**
     * Update a user
     * @param req
     * @param res
     */
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (isNaN(+id)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid user ID',
                });
            }

            const user = await UserService.update(+id, req.body);

            if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }

            res.json({
                success: true,
                data: toDTO(userResponseSchema, user),
            });
        } catch {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    /**
     * Delete a user
     * @param req
     * @param res
     */
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (isNaN(+id)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid user ID',
                });
            }

            const user = await UserService.delete(+id);

            if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }

            res.json({
                success: true,
                message: 'User deleted successfully',
            });
        } catch {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
}

