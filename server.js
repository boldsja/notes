const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.port || 3001; 
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.use("/", htmlRoutes)

app.use(express.static('public'));




app.listen(PORT, ()=>
  console.log(`example app listening at http://localhost:${PORT}`)
);