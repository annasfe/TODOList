const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const DB_SERVER = "mongodb://localhost:27017"
const database = "simpleUserDB"



mongoose.connect(`${DB_SERVER}/${database}`)
.then(() => console.log("Conected to DB server"))
.catch((err) => console.log(err));




const app = express();
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

const ejs = require('ejs');
app.use(express.json());
app.set('view engine', 'ejs');




const tasksController = require('./controllers/tasksController');
const tasksRoutes = require('./routes/tasksRoutes')


const portName = 'localhost';
const port = process.env.PORT || 3000;




app.use('/tasks', tasksRoutes)





//////
app.listen(port, (err) => {
      if (err) console.log(err);
      console.log(`Server running on port ${port}...`);
   })
