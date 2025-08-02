const bcrypt = require('bcryptjs')

const users = [
    { id: 1, username: 'user', password: bcrypt.hashSync('password', 8) }
]

module.exports = users