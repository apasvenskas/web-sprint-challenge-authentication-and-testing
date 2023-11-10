const db = require('../../data/dbConfig');

const user = db.define('user', {
 username: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true
 },
 password: {
    type: db.Sequelize.STRING,
    allowNull: false
 },
 email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true
 }
});

module.exports = user;