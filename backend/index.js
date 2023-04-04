const express = require('express');
const { MongoClient } = require("mongodb");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// connect to mongodb
const uri = "mongodb://localhost:27017?retryWrites=true&writeConcern=majority";
const client = new MongoClient(uri);
client.connect();
const db = client.db("notes");

const lastUpdated = (col, val) => {
    col.updateOne({ _id: "allLogs" },
        {
            $set: {
                lastUpdated: val,
                [`logs.${val}.lastEdit`]:Date.now()
            }
        }, { $upsert: true }).then(d => console.log(d))
}

app.get('/api/item/:username/:id', (req, res) => {
    const col = db.collection(req.params.username);
    col.findOne({ _id: req.params.id }).then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    })
});

app.get('/api/allLogs/:username', (req, res) => {
    const col = db.collection(req.params.username);
    col.findOne({ _id: "allLogs" }).then(data => {
        delete data._id;
        res.send(data);
    }).catch(err => {
        console.log(err);
    })

});

app.put('/api/newLog/:username', (req, res) => {
    const col = db.collection(req.params.username);
    const doc = req.body;
    const updateDoc = {
        $set: {
            [`logs.${doc["id"]}`]: doc
        }
    }

    col.updateOne({ _id: "allLogs" }, updateDoc, { upsert: true })

    const subNoteKey = Date.now().toString();
    const newDoc = {
        _id: doc.id,
        keys: [subNoteKey],
        [`${subNoteKey}`]: {
            log: ["Notes Here"],
            name: "Title Here"
        }
    }
    col.insertOne(newDoc).then(data => res.send(data))

    lastUpdated(col, doc.id);
})

app.post('/api/save/:username', (req, res) => {
    const col = db.collection(req.params.username);
    const doc = req.body;
    console.log(doc)
    const subDoc = {
        $set: doc
    }

    col.updateOne({ _id: doc['_id'] }, subDoc, { upsert: true }).then(data => res.send(data))

    lastUpdated(col, doc._id);
})

app.listen(3030, () => {
    console.log('Server started on port 3030');
});  