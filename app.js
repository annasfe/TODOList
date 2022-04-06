const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send("Hello user!");
});

const port = 3000;
const hostname = 'localhost';

app.listen(port, hostname, (err) => {
  if (err) {
    return console.log("Something went wrong: " + err);
  } else {
    console.log(`Server running on port ${port}...`)
  }
})