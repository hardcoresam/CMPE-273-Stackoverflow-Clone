const kafka = require('./../kafka/kafka')
const actions = require('./../actions/actions.json')

exports.createUser = async (req,res) => {
    kafka.sendKafkaRequest('users',{...req.body,action:actions.REGISTER_USER},(err,data) => {
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.login = async (req,res) => {
    kafka.sendKafkaRequest('users',{...req.body,action:actions.LOGIN},(err,data) => {
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}