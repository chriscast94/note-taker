const express = require('express');
var fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

//Middleware to serve static files from public, 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



//HTML Routes
//route to home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});
//route to notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

//returns the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

//API Routes
//GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) =>
    fs.readFile(__dirname, "/db/db.json", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.send(JSON.parse(data))
        }
    })
);


//POST /api/notes should receive a new note to save on the request body, add it to the db.json file then return the new note to the client give each note a unique id when it's saved - package
app.post("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        }
        let note = JSON.parse(note)

        let id = note.length;
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: id
        }
        let currNote = note.concat(newNote);

        fs.writeFile(__dirname, "/db/db.json", JSON.stringify(currNote), (err, data) => {
            if (err) {
                console.error(err)
            }
            console.log(currNote);
            res.JSON(JSON.parse(data));
        });
    })
})


app.put("/api/notes/:id", (req, res) => {
    const idNotes = JSON.parse(req.params.id)
    console.log(idNotes)
    fs.readFile(__dirname, "db/db.json", "utf8", (err, data) =>{
        if(err) {
            console.log(err)
        }
        notes.JSON.parse(notes)

        notes = notes.filter(val => val.id != idNotes)

        fs.writeFile(__dirname, "db/db.json", JSON.stringify(notes), (err, data) => {
            if (err) {
                console.log(err);
            }
            res.json(notes);
        })
    })
})

// Develop Delete Requests

//Initialize server to begin listening
app.listen(PORT, () =>
    console.log(`Notes server listening at http://localhost:${PORT}`)
);

