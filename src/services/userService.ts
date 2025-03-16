import prisma from "@/utils/prisma/client";
import { User } from "@prisma/client";

type UserPartial = Pick<User, "id" | "country" | "dateOfBirth" | "email" | "firstName" | "lastName">;

export async function getUserById(userId: string) {
    const user = await prisma.user.findFirst({ where: { id: userId } });
    return user;
}

export async function createUser(user: UserPartial) {
    const userAccount = await prisma.user.create({
        data: user,
    });
    return userAccount;
}
