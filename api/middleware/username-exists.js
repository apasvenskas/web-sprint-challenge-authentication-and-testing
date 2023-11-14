const User = require('../users/user-model');

async function usernameExists(req, res, next) {
    try {
        const { username } = req.body;
        const user = await User.getByUsername(username)
        if(!user) {
            res.status(404).json({ message: 'username does not exist' });
        } else {
            req.user = user;
            next();
        }
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

module.exports = usernameExists