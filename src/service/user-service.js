import {validate} from "../validation/validation.js";
import {loginUserValidation, registerUserValidation} from "../validation/user-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcrypt";

const register = async (req) => {
    const user = validate(registerUserValidation, req);

    const isUserExist = await prismaClient.user.count({
        where: {
            email: user.email
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

const login = async (req) => {
    const loginRequest = validate(loginUserValidation, req);

    const isUserExist = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            email: true,
            password: true,
        }
    });

    if (!isUserExist) {
        throw new ResponseError(400, 'User does not exist');
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, isUserExist.password);

    if (!isPasswordValid) {
        throw new ResponseError(400, 'Username or password is incorrect');
    }

    const token = uuidv4();
    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            email: isUserExist.email
        },
        select: {
            token: true
        }
    });
}

export default {register, login};