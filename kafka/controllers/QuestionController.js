const kafka = require('./../kafka/kafka')
const actions = require('./../actions/actions.json')

exports.createQuestion = async (req,res) => {
    console.log(req.user)
    kafka.sendKafkaRequest('question',{...req.body,action:actions.ASK_QUESTION},(err,data) => {
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.getQuestions = async (req,res) => {
    console.log("get questions")
    kafka.sendKafkaRequest('question',{...req.body,action:actions.GET_QUESTIONS},(err,data) => {
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.getQuestion = async (req,res) => {
    console.log("get question")
    kafka.sendKafkaRequest('question',{...req.body, questionId: req.params.questionId, action:actions.GET_QUESTION},(err,data) => {
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.bookmarkQuestion = async (req,res) => {
    console.log("bookmark question")
    kafka.sendKafkaRequest('question',{...req.body, questionId: req.params.questionId, action:actions.BOOKMARK_QUESTION},(err,data) => {
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}