const User = require('../users/user-model');

async function uniqueUsername(req, res, next) {
    try{
        const { username } = req.body;
        const user = await User.findBy({ username })
        if (user) {
            res.status(400).json({ message: 'username is already taken' });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = uniqueUsername;