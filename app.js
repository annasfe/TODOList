const express = require('express');
const ejs = require('ejs');
<<<<<<< Updated upstream
const fs = require('fs');
=======
const tasksRouter = require('./routes/tasks');
const homeRouter= require ('./routes/index');
>>>>>>> Stashed changes

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

<<<<<<< Updated upstream
let items = [];

app.get('/tasks', (req, res) => {
  items = fs.readFileSync('todolist.txt').toString().split("\n");
  res.render('index', { newListItems: items });
});

app.post('/tasks', (req, res) => {
  items.push(req.body.newItem);
  fs.appendFile('./todolist.txt', items[items.length - 1] + "\n", 'utf8', function (err) {
    if (err) return console.log(err);
  });
  res.redirect('/tasks');
});
=======

app.use('/tasks', tasksRouter); 
app.use('/', homeRouter);
>>>>>>> Stashed changes


// SERVER RUNNING
const port = process.env.PORT || 3000;
const hostname = 'localhost';

app.listen(port, hostname, (err) => {
  if (err) {
    return console.log("Something went wrong: " + err);
  } else {
    console.log(`Server running on port ${port}...`)
  }
})