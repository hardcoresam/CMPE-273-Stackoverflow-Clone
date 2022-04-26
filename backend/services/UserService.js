const db = require('../models/mysql')
const User = db.User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const actions = require('../../util/kafkaActions.json')

exports.handle_request = (payload, callback) => {
    const { action } = payload;
    switch (action) {
        case actions.REGISTER_USER:
            createUser(payload, callback);
            break;
        case actions.LOGIN:
            login(payload, callback);
            break;
    }
};

const createUser = async (payload, cb) => {
    try {
        const { firstName, lastName, email, password, title } = payload
        await User.findOne({ where: { Email: email } }).then(async data => {
            if (data) {
                cb("Already registered", null)
            } else {
                const salt = await bcrypt.genSalt(10)
                const encrypted = await bcrypt.hash(password, salt)

                const user = {
                    First_Name: firstName,
                    Last_Name: lastName,
                    Email: email,
                    Password: encrypted,
                    Title: title
                }

                User.create(user).then(data => {
                    cb(null, data)
                })
                    .catch(err => {
                        cb(err, null)
                    })

            }
        })
    } catch (error) {
        cb(error, null)
    }
}

const login = async (payload, cb) => {
    const { email, password } = payload
    try {
        const user = await User.findOne({ where: { Email: email } })
        console.log("=====", user)
        if (!user) {
            cb("No user found", null)
        }

        const authenticated = await bcrypt.compare(password, user.dataValues.Password)

        if (!authenticated) {
            return cb("Invalid Credentials", null)
        }


        const payload = {
            user: {
                id: user.dataValues.id
            }
        }

        console.log("------------------------", payload, process.env.SECRET_KEY)
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            // expiresIn: 3600,
        }, (err, token) => {
            if (err) {
                console.err(err);
                return cb(err, null)
            }
            return cb(null, { token: token })
        }
        )

    } catch (error) {
        console.log(error)
        return cb(error, null)
    }
}