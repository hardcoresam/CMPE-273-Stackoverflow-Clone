const kafkaConection = require('./KafkaConnect')
const QuestionService = require('./../services/QuestionService')
const actions = require('./../actions/actions.json')

kafkaConection.getConsumer('question',(consumer) => {
    
    var producer = kafkaConection.getProducer()

    consumer.on('message', function(message){
        var data = JSON.parse(message.value)
        const {payload,correlationId} = data 
        const { action } = payload
        
        console.log("1. question Data at backend...")

        if(action == actions.ASK_QUESTION) {
            QuestionService.askQuestion(payload,(err,res)=>{
                var payload = {}
                    if(err){
                        console.log("Serivce failed, ERR: ",err)
                       payload ={
                        status: 400,
                        content : err,
                        correlationId:correlationId
                       } 
                    }
            
                    if(res){
                        payload = {
                            status:200,
                            content:res,
                            correlationId:correlationId
                        }
                    }
            
                    //Send Response to acknowledge topic
                    payloads = [
                        {topic:'acknowledge',messages:JSON.stringify({"acknowledgementpayload":true,payload}),partition:0}
                    ]
                    producer.send(payloads,(err,data)=>{
                        if(err) throw err
                        console.log("2. Sent Acknowledegemt ...\n",data)
                    })
            })
        }  
        
        if(action == actions.GET_QUESTIONS) {
            QuestionService.getQuestions(payload,(err,res)=>{
                var payload = {}
                    if(err){
                        console.log("Serivce failed, ERR: ",err)
                       payload ={
                        status: 400,
                        content : err,
                        correlationId:correlationId
                       } 
                    }
            
                    if(res){
                        payload = {
                            status:200,
                            content:res,
                            correlationId:correlationId
                        }
                    }
            
                    //Send Response to acknowledge topic
                    payloads = [
                        {topic:'acknowledge',messages:JSON.stringify({"acknowledgementpayload":true,payload}),partition:0}
                    ]
                    producer.send(payloads,(err,data)=>{
                        if(err) throw err
                        console.log("2. Sent Acknowledegemt ...\n",data)
                    })
            })
        }  
    })
})