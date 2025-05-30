import {prismaClient} from "../application/database.js";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "tester"
        }
    });
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "testuser",
            first_name: "testfirst_name",
            last_name: "testlast_name",
            email: "testemail@mail.com",
            password: "password",
        }
    });
}