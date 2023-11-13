const bcrypt = require ('bcryptjs');

exports.seed = function(knex) {
    return knex('users').del()
    .then(function() {
        return knex('users').insert([
            { username: 'alice', password: bcrypt.hashSync ("12345", 8)},
            { username: 'bob', password: bcrypt.hashSync ("qwerty", 8)},
            { username: 'charlie', password: bcrypt.hashSync ("password", 8)}
        ])
    })
}