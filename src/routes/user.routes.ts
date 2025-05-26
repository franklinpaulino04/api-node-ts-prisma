import { Router } from 'express';

import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/authorize.middleware';
import { validate } from "../middleware/validate";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

const router = Router();

router.get('/', authMiddleware, authorizeRoles('admin'),  UserController.getAll);
router.get('/:id', authMiddleware, authorizeRoles('admin'), UserController.getById);
router.post('/', authMiddleware, validate(createUserSchema), authorizeRoles('admin'), UserController.create);
router.put('/:id', authMiddleware, validate(updateUserSchema), authorizeRoles('admin'), UserController.update);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), UserController.delete);

export default router;
