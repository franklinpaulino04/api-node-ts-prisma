import { Router, Request, Response } from 'express';

import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/authorize.middleware';
import {validate} from "../middleware/validate";
import {createUserDto} from "../schemas/user.schema";

const router = Router();

router.get('/', authMiddleware, authorizeRoles('admin'),  UserController.getAll);
router.get('/:id', authMiddleware, authorizeRoles('admin'), UserController.getById);
router.post('/', authMiddleware, validate(createUserDto), authorizeRoles('admin'), UserController.create);
router.put('/:id', authMiddleware, validate(createUserDto), authorizeRoles('admin'), UserController.update);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), UserController.delete);

export default router;
