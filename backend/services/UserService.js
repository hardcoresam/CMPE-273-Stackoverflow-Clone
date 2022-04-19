const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = async (payload,cb) => {
    try {
        const {firstName,lastName,email,password,title} = payload
        await User.findOne({where: {Email :email}}).then( async data => {
            if(data){
                cb("Already registered",null)
            }else{
                const salt = await bcrypt.genSalt(10)
                const encrypted = await bcrypt.hash(password, salt)

                const user = {
                    First_Name: firstName,
                    Last_Name: lastName,
                    Email: email,
                    Password: encrypted,
                    Title:title
                }

                User.create(user).then(data => {
                    cb(null,data)
                })
                .catch(err=>{
                    cb(err,null)
                })

            }
        })
    } catch (error) {
        cb(error,null)
    } 
}

exports.login = async (payload,cb) => {
    const {email,password} = payload
    try {
        const user = await User.findOne({where:{Email:email}})
        console.log("=====",user)
        if(!user){
            cb("No user found",null)
        }
        
        const authenticated = await bcrypt.compare(password,user.dataValues.Password)

        if(!authenticated){
            return cb("Invalid Credentials",null)
        }


        const payload = {
            user:{
                id:user.dataValues.id
            }
        }

        console.log("------------------------",payload,process.env.SECRET_KEY)
        jwt.sign(
            payload,
            "kkkk",
            {
                expiresIn: 3600,
            },
            (err,token) => {
                if(err) return cb(err,null)
                return cb(null,{token:"Bearer "+token})
            }
        )

    } catch (error) {
        console.log(error)
        return cb(error,null)
    }
}