import User from "../model/authModel";
import bcrypt from "bcrypt";

class UserService {
    // Seed the hardcoded admin if not present
    async seedAdmin(): Promise<void> {
        const adminEmail = "fayroz@admin.com";
        const existing = await User.findOne({ email: adminEmail });
        if (!existing) {
            const hashed = await bcrypt.hash("fayroz123", 10);
            await User.create({ email: adminEmail, password: hashed, role: "admin" });
            console.log("✅ Admin user seeded: fayroz@admin.com");
        }
    }

    // Find user by email
    async findByEmail(email: string): Promise<{ _id: string; email: string; password: string; role: string } | null> {
        const user = await User.findOne({ email }).lean();
        if (!user) return null;
        return {
            _id: (user._id as any).toString(),
            email: user.email,
            password: user.password,
            role: user.role,
        };
    }
}

export default UserService;