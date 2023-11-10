exports.seed = function(knex) {
    return knex('users').del()
    .then(function() {
        return knex('users').insert([
            { username: 'alice', password: "12345"},
            { username: 'bob', password: "qwerty"},
            { username: 'charlie', password: "password"}
        ])
    })
}