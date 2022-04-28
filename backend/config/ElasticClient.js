const elastic = require('elasticsearch')

const elastClient = elastic.Client({
    host:'localhost:9200'
})

module.exports = elastClient