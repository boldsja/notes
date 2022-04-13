const path = require("path");
const router = require("express").Router();

router.get('/', (req, res) => {
    console.log("send route") //make sure route is correct
      res.sendFile(path.join(__dirname, '../public/index.html'))
    });

    router.get('/notes', (req, res) => {
        console.log("send route") //make sure route is correct
          res.sendFile(path.join(__dirname, '../public/notes.html'))
        });


module.exports = router