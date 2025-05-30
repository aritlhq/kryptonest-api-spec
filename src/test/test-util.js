import {prismaClient} from "../application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            email: "testemail@mail.com"
        }
    });
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "tester",
            first_name: "testfirst_name",
            last_name: "testlast_name",
            email: "testemail@mail.com",
            password: await bcrypt.hash("password", 10),
            token: "123456"
        }
    });
}