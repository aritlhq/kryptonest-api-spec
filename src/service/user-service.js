import {validate} from "../validation/validation.js";
import {getUserValidation, loginUserValidation, registerUserValidation} from "../validation/user-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req) => {
    const user = validate(registerUserValidation, req);

    const isUserExist = await prismaClient.user.count({
        where: {
            OR: [
                {email: user.email},
                {username: user.username},
            ]
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

    const token = jwt.sign({
        email: isUserExist.email,
        password: isPasswordValid
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '10s'
    });

    return {
        token: token
    }
}

const get = async (email) => {
    email = validate(getUserValidation, email)

    const isUserExist = await prismaClient.user.findUnique({
        where: {
            email: email
        },
        select: {
            email: true,
            username: true,
        }
    });

    if (!isUserExist) {
        throw new ResponseError(400, 'User does not exist');
    }

    return isUserExist;
}

export default {
    register,
    login,
    get
};