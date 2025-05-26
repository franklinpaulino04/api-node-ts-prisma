import { createUserDto, updateUserDto } from "../schemas/user.schema";
import prisma from "../prisma/client";

class UserServiceClass {
    private repo = prisma.user;

    /**
     * Create a new user
     * @param data
     */
    async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
        const [data, total] = await prisma.$transaction([
            this.repo.findMany({
                where: { deletedAt: null },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.repo.count({ where: { deletedAt: null } }),
        ]);
        return { data, meta: { total, page, totalPages: Math.ceil(total / limit) } };
    }

    /**
     * Find a user by ID
     * @param id
     */
    findById(id: number) {
        return this.repo.findFirst({ where: { id } });
    }

    /**
     * Create a new user
     * @param data
     */
    create(data: createUserDto) {
        return this.repo.create({ data: data });
    }

    /**
     * Update a user
     * @param id
     * @param data
     */
    update(id: number, data: updateUserDto) {
        return this.repo.update({
            where: { id },
            data: { ...data, updatedAt: new Date() }
        });
    }

    /**
     * Delete a user
     * @param id
     */
    delete(id: number) {
        return this.repo.update({
            where: { id },
            data: { deletedAt: new Date(), updatedAt: new Date() }
        });
    }
}

export const UserService = new UserServiceClass();