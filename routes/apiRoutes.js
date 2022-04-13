const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const db = require("../db/db.json");
const { v4: uuidv4 } = require('uuid');


//    /api/notes
router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '../db/db.json'));
})


// youre matching the post route on public/assets/js/index.js where they have a saveNote function that POST at /api/notes
router.post("/notes", function (req, res) {

    // here in the req.body we can see the note info that we want to push to our DB
    console.log("note to post to backend", req.body)

    // to be nice we set it up inside of an object variable and add an id to it
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }

    // now we want to tell this file where to find the db.json file and to read it and give us the data from it in utf-8 format
    fs.readFile(path.join(__dirname, "../db/db.json"), function (err, data) {
        if (err) throw err;

        console.log("data from our db.json", data)

        // because its in JSON format we need to parse it into JS
        const parsedNotes = JSON.parse(data)

        // after its parsed we want to push our newNote variable into the parsed notes from the DB
        parsedNotes.push(newNote)

        // now we can see our newNote in with the other existing notes from the DB
        console.log("parsedNotes from db.json with newNote added", parsedNotes)

        // we need to write the updated note list back to our db.json...same thing again were telling it where to find that file and to write
        // this to it...notice JSON.stringify(parsedNotes) to parse it back to JSON format
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(parsedNotes), function (err) {
            if (err) throw err;
            console.log("Your note has been saved to the DB!!");
        })
        // once its successfully written back to the db file were going to do a quick "GET" to read the udpated file 
        res.sendFile(path.join(__dirname, '../db/db.json'));
    })

})

router.delete("notes/:id", function(req, res){
    // console.log(req.params.id)

    // youre going to want to read the db file **hint hint look at fs.readFile above
    // parse the notes...again hint hint look above
    // here is where youre going to need to figure it out. once you have the notes parsed you want to looop through them and compare them and delete the one you cl icked on
    // then youll need to writeFile hint hint above again. and do the quick "GET" method again (line 49)
})


module.exports = router;