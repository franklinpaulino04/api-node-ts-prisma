import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';

import { createUserSchema } from '../schemas/user.schema';
import { loginSchema } from "../schemas/login.dto";

const router = Router();

router.post('/register', validate(createUserSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);

export default router;
