const User = require('../users/user-model');

async function uniqueUsername(req, res, next) {
    try{
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'username and password required' });
        } else {
            const user = await User.getByUsername(username)
            if (user) {
                res.status(400).json({ message: 'username taken' });
            } else {
                next();
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = uniqueUsername;