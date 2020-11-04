// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";

// app config
const app = express();
const port = process.env.PORT || 3000;

const pusher = new Pusher({
  appId: "1100621",
  key: "8ab09b5f25f4daadf04e",
  secret: "4d504f3faa3df0facccd",
  cluster: "us2",
  useTLS: true,
});

// middleware
app.use(express.json());

// DB config
const connection_url =
  "mongodb+srv://admin:cyiQcAJkwF2BRyrY@cluster0.fjask.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// does this once the db is connected to "watch" for for changes
db.once("open", () => {
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocuments;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.user,
        message: messageDetails.message,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

// api routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.send(500).send(err);
    } else {
      res.send(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));
