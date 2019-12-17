const bcrypt = require('bcrypt')
const { get, set } = require('lodash')

// same code as mongoose-password-plugin on npm but was having issues
// with mismatched bcrypt versions

function comparePasswordCallback(config) {
    let { passwordField } = config

    return function (passwordToCheck, cb) {
        let password = get(this, passwordField)

        bcrypt.compare(passwordToCheck, password, (err, isMatch) => {
            if (err) return cb(err)

            cb(null, isMatch)
        })
    }
}

function comparePasswordSync(config) {
    let { passwordField } = config

    return function (passwordToCheck) {
        let password = get(this, passwordField)
        let match = bcrypt.compareSync(passwordToCheck, password)

        return match
    }
}

function comparePasswordPromise(config) {
    let { passwordField } = config

    return async function (passwordToCheck) {
        return new Promise((resolve, reject) => {
            let password = get(this, passwordField)
            bcrypt.compare(passwordToCheck, password, (err, isMatch) => {
                if (err) return reject(err)

                resolve(isMatch)
            })
        })
    }
}

const comparePasswordMethods = {
    callback: comparePasswordCallback,
    promise: comparePasswordPromise,
    sync: comparePasswordSync
}

function passwordPlugin(schema, options = {}) {
    let {
        bcryptRounds = 10,
        comparePasswordType = 'callback',
        passwordField = 'password'
    } = options

    let comparePasswordMethod = comparePasswordMethods[comparePasswordType]

    if (!comparePasswordMethod) {
        throw new Error(`${comparePasswordType} is not a supported type for 'comparePasswordType'`)
    }

    comparePasswordMethod = comparePasswordMethod({ passwordField })

    schema.add({
        [`${passwordField}`]: {
            type: String,
            required: true
        }
    })

    // http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
    schema.pre('save', function (next) {
        if (!this.isModified(passwordField)) {
            return next()
        }

        bcrypt.genSalt(bcryptRounds, (err, salt) => {
            if (err) return next(err)

            let password = get(this, passwordField)
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return next(err)

                set(this, passwordField, hash)

                next()
            })
        })
    })

    schema.methods.comparePassword = comparePasswordMethod
}

module.exports = passwordPlugin