import prisma from "@/utils/prisma/client";
import { User } from "@prisma/client";
import { createNewJournal } from "./journalServices";

type UserPartial = Pick<User, "id" | "country" | "dateOfBirth" | "email" | "firstName" | "lastName">;

export async function getUserById(userId: string) {
    const user = await prisma.user.findFirst({ where: { id: userId } });
    return user;
}

export async function checkProfileCreated(userId: string) {
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (user && user.firstName === "") return false;
    return true;
}

export async function createAppUser(user: UserPartial) {
    const userAccount = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: user,
    });

    await createNewJournal(user.id, "My First Journal");

    return userAccount;
}
