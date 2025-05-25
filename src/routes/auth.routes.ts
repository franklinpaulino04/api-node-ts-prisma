import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';

import { createUserDto } from '../schemas/user.schema';
import {loginDto} from "../schemas/login.dto";

const router = Router();

router.post('/register', validate(createUserDto), AuthController.register);
router.post('/login', validate(loginDto), AuthController.login);

export default router;
