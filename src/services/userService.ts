import prisma from "@/utils/prisma/client";
import { User } from "@prisma/client";

export async function getUserById(userId: string) {
    const user = await prisma.user.findFirst({ where: { id: userId } });
    return user;
}
