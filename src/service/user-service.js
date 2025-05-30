import {validate} from "../validation/validation.js";
import {registerUserValidation} from "../validation/user-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import bcrypt from "bcrypt";

const register = async (req) => {
    const user = validate(registerUserValidation, req);

    const isUserExist = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (isUserExist === 1) {
        throw new ResponseError(404, 'User already exists');
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            first_name: true,
            last_name: true,
            email: true,
        }
    });
}

export default {register};