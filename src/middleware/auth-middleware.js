import {prismaClient} from "../application/database.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({error: "Unauthorized"});
    }

    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: "Unauthorized",
        }).end();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await prismaClient.user.findUnique({
            where: {
                email: decoded.email,
            },
            select: {
                email: true,
                username: true,
            }
        });

        if (!user) {
            return res.status(401).json({
                errors: "Unauthorized",
            }).end();
        }

        req.user = user;
        next();
    } catch (e) {
        return res.status(401).json({
            errors: "Invalid or expired token"
        }).end();
    }
}