export default async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (req.user.role !== 'admin') {
            return res
                .status(500)
                .json({ message: 'User do not have permissions' });
        }

        next();
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};
