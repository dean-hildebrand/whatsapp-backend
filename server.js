// importing
import express from 'express'
import mongoose from 'mongoose'

// app config
const app = express()
const port = process.env.PORT || 3001;
// middleware



// DB config
const connection_url = "mongodb+srv://admin:2BOAvJODMSjXeElH>@cluster0.fjask.mongodb.net/whatsappDB?retryWrites=true&w=majority"

mongoose.connect(connection_url,{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//

// api routes
app.get('/', (req, res) => res.status(200).send("dean"))




// listener
app.listen(port,() => console.log(`Listening on localhost:${port}`))

// 2BOAvJODMSjXeElH
