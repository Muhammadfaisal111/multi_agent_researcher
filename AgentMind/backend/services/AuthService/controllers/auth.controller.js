import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";
export const login = async(req, res) => {

    try {
        const { token } = req.body;
        const decoded= await getAuth(app).verifyIdToken(token);
        let user = await User.findOne({ firebaseId: decoded.uid });
        if (!user) {
            user = await User.create({
                firebaseId: decoded.uid,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.picture
            });
        }
        const sessionId = crypto.randomUUID();
        res.cookie("session", sessionId, {
            httpOnly: true,
            secure:false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};