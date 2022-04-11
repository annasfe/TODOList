const express = require('express');
const taskRoutes = require('./routes/taskRoutes')
const rootRoutes = require('./routes/rootRoutes');
const path = require('path')
const ejs = require('ejs')
// const { use } = require('express/lib/application');

const app = express();
const port = 3000
const hostName = 'localhost'

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/', rootRoutes)
app.use('/tasks', taskRoutes)
 

app.listen(port, hostName, (err) => {
    if (err) console.log("Something went wrong " + err );
    else console.log(`Server running on port ${port}...`);
})
