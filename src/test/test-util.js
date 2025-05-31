import {prismaClient} from "../application/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            first_name: "test first_name",
            last_name: "test last_name",
            email: "testemail@mail.com",
            password: await bcrypt.hash("password", 10),
            // token: token
        }
    });

    const token = jwt.sign({
        email: "testemail@mail.com",
        username: "tester",
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10s"
    });

    return token;
}