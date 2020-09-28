// importing
import express from 'express'

// app config
const app = express()
const port = process.env.PORT || 3001;
// middleware



// DB config

//

// api routes
app.get('/', (req, res) => res.status(200).send("dean"))
// listener

app.listen(port,() => console.log(`Listening on localhost:${port}`))
