const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasksRouter');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use('/', tasksRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});