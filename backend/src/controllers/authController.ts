import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ success: false, message: "All fields are required" });
            return;
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
            res.status(400).json({ success: false, message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET || "defaultsecret");

        newUser.password = "";
        res.status(201).json({
            success: true,
            token,
            user: newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, message: "All fields are required" });
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: "User not found" });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ success: false, message: "Invalid credentials" });
            return;
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "defaultsecret");
        user.password = "";
        res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}