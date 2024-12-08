import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const register = async (req, res) => {
    try {
        const { username, email, password: pass, role } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pass, salt);

        const user = await User.create({
            username,
            email,
            password: hash,
            role,
        });

        const { password, ...userData } = user._doc;

        res.status(201).json(userData);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password: pass } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValid = await bcrypt.compare(pass, user.password);

        if (!isValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const { password, ...userData } = user._doc;

        res.status(200).json(userData);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};
