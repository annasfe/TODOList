//requiring modules
const express = require('express');
const ejs = require('ejs');

const app = express(); //creating server

let items = []; //create an empty array for the list items

//some stuff I dunno
app.use(express.static('public')); //set where my public files are
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//when I load the homepage, load index.ejs
app.get('/', (req, res) => {
  res.render('index', {newListItems: items}); //'index' means index.ejs page
});

//when I press submit button, parse newItem value and assign to item var, then push item inside items array
app.post('/', (req, res) => {
  let item = req.body.newItem;
  items.push(item);
  console.log(item);
  res.redirect('/');
});




// SERVER RUNNING ON PORT 3000...

const port = 3000;
const hostname = 'localhost';

app.listen(port, hostname, (err) => {
  if (err) {
    return console.log("Something went wrong: " + err);
  } else {
    console.log(`Server running on port ${port}...`)
  }
})