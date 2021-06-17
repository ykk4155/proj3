//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

//app config
const app = express()
const port = process.env.PORT || 9000

//PUSHER
const pusher = new Pusher({
  appId: "1220108",
  key: "54600498535adbc951ff",
  secret: "fc0d2666a401e5052959",
  cluster: "us2",
  useTLS: true
});

//middleware
app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
    res.setHeader("access-control-allow-origin", "*");
    res.setHeader("access-control-allow-headers", "*");
    next();
});

//DB config
const connection_url="mongodb+srv://yasha0101:wDDuCEMYatQylctG@cluster0.0pmzg.mongodb.net/whatsappdb?retryWrites=true&w=majority"
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.once('open', () => {
    console.log("DB is fired up !");

const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received:messageDetails.received,
                }
            );
        } else {
            console.log ('error triggering pusher,check server.js')
        }
    });
});


//API routes
app.get('/', (req, res) => res.status(200).send('Hello !'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));

