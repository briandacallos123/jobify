import { verifyToken } from "../utils/tokenUtils.js";

export const authMiddleware = (req, res, next) => {
    const { token } = req.cookies;


    try {
        if (!token) throw new Error("Token is not present");
        const validToken = verifyToken(token);

        if (!validToken) throw new Error("Invalid token");

        const { userId, role } = validToken
        req.user = { userId, role }
        next()
    } catch (error) {
        throw new Error(error)
    }
}