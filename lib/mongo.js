const config = require('config-lite')
    , mongoose = require('mongoose')


mongoose.Promise = global.Promise
mongoose.connect(config.mongodb)