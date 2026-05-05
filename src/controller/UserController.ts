import type { Request, Response } from "express";
import UserService from "../services/UserServices";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    loginUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: "Email and password are required" });
                return;
            }

            const user = await this.userService.findByEmail(email);
            if (!user) {
                res.status(401).json({ error: "Invalid email or password" });
                return;
            }

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                res.status(401).json({ error: "Invalid email or password" });
                return;
            }

            const secret = process.env.JWT_SECRET || "fayroz_secret_key_123";
            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                secret,
                { expiresIn: "7d" }
            );

            res.json({
                success: true,
                token,
                user: { id: user._id, email: user.email, role: user.role },
            });
        } catch (error: any) {
            console.error("Login error:", error);
            res.status(500).json({ error: "Internal Server Error", detail: error?.message || String(error) });
        }
    };
}

export default UserController;