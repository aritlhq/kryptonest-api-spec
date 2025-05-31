import Joi from 'joi';

const registerUserValidation = Joi.object({
        username: Joi.string().min(5).max(10).required(),
        first_name: Joi.string().max(100).required(),
        last_name: Joi.string().max(100).required(),
        email: Joi.string().max(200).email().required(),
        password: Joi.string().max(100).required(),
    }
);

const loginUserValidation = Joi.object({
    email: Joi.string().max(200).email().required(),
    password: Joi.string().max(200).required(),
});

const getUserValidation = Joi.string().max(200).email().required();

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation
};