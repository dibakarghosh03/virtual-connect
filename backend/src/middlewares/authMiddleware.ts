import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
        if (!decoded) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        req.body.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error while parsing token" });
    }
}