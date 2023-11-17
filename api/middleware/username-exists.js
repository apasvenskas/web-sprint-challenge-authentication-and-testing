const User = require('../users/user-model');

async function usernameExists(req, res, next) {
    try {
        const { username } = req.body;
        if (!username) {
            res.status(400).json({ message: 'username and password required' });
        } else {
            const user = await User.getByUsername(username)
            if(!user) {
                return res.status(401).json({ message: 'invalid credentials' })
            } else {
                req.user = user;
                next();
            }
        }
    } catch (error) {
        res.status(500).json({ message: "erororr occuerred during the process"});
    }
}

module.exports = usernameExists