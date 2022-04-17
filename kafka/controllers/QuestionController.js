const kafka = require('./../kafka/kafka')
const actions = require('./../actions/actions.json')

exports.createQuestion = async (req,res) => {
    kafka.sendKafkaRequest('question',{...req.body,action:actions.ASK_QUESTION},(err,data) => {
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.getQuestions = async (req,res) => {
    kafka.sendKafkaRequest('question',{...req.body,action:actions.GET_QUESTIONS},(err,data) => {
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}