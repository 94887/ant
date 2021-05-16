const mongoose = require('mongoose')
const mongoDB = process.env.MONGO_DB || ""
mongoose.connect(`${mongoDB}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

