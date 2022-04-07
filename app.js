//requiring modules
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');

const app = express(); //creating server

const items = []; //create an empty array for the list items

app.set('view engine', 'ejs');   //to read ejs file in views folder
app.use(express.static('public')); //set where my public files are
app.use(express.urlencoded({ extended: true }));  //body parser
app.use(express.json()); //body parser


//when I load the root '/', load index.ejs (with ejs we have to use res.render)
app.get('/', (req, res) => {
  res.render('index', { newListItems: items }); //newListItems is array name in ejs page while items is the name of array in app.js
});

//when I press submit button, catch newItem value in form input and push in items array, then reload root page "/"
app.post('/', (req, res) => {
  items.push(req.body.newItem); //push inside array items the value of form input (= newItem)
  fs.appendFile('./todolist.txt', items[items.length-1] + "\n", 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
  });

  res.redirect('/');
});

// SERVER RUNNING ON PORT 3000...

const port = process.env.PORT || 3000;
const hostname = 'localhost';

app.listen(port, hostname, (err) => {
  if (err) {
    return console.log("Something went wrong: " + err);
  } else {
    console.log(`Server running on port ${port}...`)
  }
})
