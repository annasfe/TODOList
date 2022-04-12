const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasksRouter');
const mongoose = require('mongoose');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use('/', tasksRouter);


const server = '127.0.0.1:27017'; // REPLACE IF ON ATLAS
const database = 'tasks';      // THE DB NAME
const port = process.env.PORT || 3000;


var mongoDB = `mongodb://${server}/${database}`;
mongoose.connect(mongoDB, {useNewUrlParser: true})
    .then(() => {
        console.log('Database connection successful')
        app.listen(port, "localhost", (err) =>{
            if(err) console.log("Server could not be started" + err);
            else console.log("Server listening at port 3000....")
        })
    })
    .catch(err => {
        console.error('Database connection error')
    });

  //const db = mongoose.connection;  

    //shorter, with not so much error handling
    // mongoose.connect(mongoDB, { useNewUrlParser: true }, ()=> {
    //     console.log("Connected to db!");
    //     app.listen(port, () => console.log("Server Up and running at port 3000"));
    // });

