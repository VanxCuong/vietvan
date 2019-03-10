const bcrypt = require('bcrypt')

const hash_password = (password) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}
const compare_password= (password,hash) => bcrypt.compareSync(password, hash); // true 


const generatePassword = (password) => new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            return reject(err)
        }
        resolve(hash.toString())
    })
})


module.exports = { compare_password, generatePassword, hash_password }