const bcrypt = require ('bcryptjs');

exports.seed = function(knex) {
    return knex('users').del()
    .then(function() {
        return knex('users').insert([
            { username: 'alice', password: bcrypt.hash ("12345", 10)},
            { username: 'bob', password: bcrypt.hash ("qwerty", 10)},
            { username: 'charlie', password: bcrypt.hash ("password", 10)}
        ])
    })
}