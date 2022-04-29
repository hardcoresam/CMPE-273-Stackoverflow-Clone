const redis = require('redis')
const client = redis.createClient();


var connectionOpen = false


exports.cacheGet = async (key,cb) => {
    if(!connectionOpen){
        await client.connect()
        connectionOpen = true
    }
    const resp = await client.get(key)
    if(resp){
        return cb(null,JSON.parse(resp))
    }
    return cb("Not Found",null)
}


exports.cacheAdd = async (key,value) => {
    try {
        await client.set(key,JSON.stringify(value))
    } catch (error) {
        
    }
}
