const kafkaConnection = require('./kafkaConnect')
const uuid = require('uuid').v4
const kafkaTopics = require('../../util/kafkaTopics.json')

module.exports = class KafkaRequestResponse {

    requests = {}
    responseQueue = false

    constructor() { }

    consumer = kafkaConnection.getConsumer(kafkaTopics.ACKNOWLEDGE_TOPIC)

    kafkaRequest(topicName, payload, results) {
        var producer = kafkaConnection.getProducer()

        const correlationId = uuid()
        var entry = {
            results: results
        }

        this.requests[correlationId] = entry

        console.log("2. CorrelationId and requests entry ...")
        this.kafkaResponse(function () {
            producer.on('ready', function () {
                let payloads = [
                    { topic: topicName, messages: JSON.stringify({ payload, correlationId }), partition: 0 }
                ]
                console.log("3. Producer sending data ...", payloads)
                producer.send(payloads, function (err, data) {
                    console.log("ERR ", err)
                    console.log("DATA ", data)
                })
            })
        })
    }

    kafkaResponse(next) {
        let requestsWaiting = this.requests
        
        if(this.responseQueue){
            return next()
        }
        
        this.consumer.on('message', function (message) {
            console.log("Acknowledgement recieved: ", message)

            var acknowledgementData = JSON.parse(message.value)
            var correlationId = acknowledgementData.payload.correlationId

            if (correlationId in requestsWaiting) {
                var entry = requestsWaiting[correlationId]

                delete requestsWaiting[correlationId]

                if (acknowledgementData.payload.status === 200) {
                    console.log("200", acknowledgementData.payload.content)
                    return entry.results(null, acknowledgementData.payload.content)
                }

                if (acknowledgementData.payload.status === 400) {
                    return entry.results(acknowledgementData.payload.content, null)
                }

                entry.results('Server Error', null)
            }
        });
        this.responseQueue = true
        this.requests = requestsWaiting
        return next()
    }
}