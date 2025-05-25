import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {LoginDto} from "../schemas/login.dto";
import {CreateUserDto} from "../schemas/user.schema";
import prisma from "../prisma/client";

export class AuthServiceClass {
    private repo = prisma.user;
    /**
     * Register a new user
     * @param data
     */
     async register(data: CreateUserDto) {
        const hashed = await bcrypt.hash(data.password, 10);
        return this.repo.create({
            data: {
                ...data,
                password: hashed,
                role: data.role || 'user'
            }
        });
    }

    /**
     * Login a user
     * @param data
     */
    async login(data: LoginDto) {
        const { email, password } = data;
        const user = await this.repo.findUnique({
            where: {
                email,
                deletedAt: null,
                isActive: true
            }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        };
    }
}

export const AuthService = new AuthServiceClass();