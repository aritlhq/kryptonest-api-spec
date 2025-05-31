import jwt from "jsonwebtoken";

const token = jwt.sign({
    email: "testemail@mail.com",
    password: "password",

}, "123456", {
    expiresIn: "30m",
});

console.log(token);