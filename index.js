const express = require('express')
const app = express()
app.use(express.json())

const port = 3000
const portName = 'localhost'

app.listen(port, portName, (err) => {
    if (err) console.log("Something went wrong " + err );
    else console.log(`Server running on port ${port}...`);
})
// '/tasks/' endpoint
app.route('/task')
    .get((req, res) => {
        res.send('here are all the tasks');
    }) //access all tasks

    .post((req, res) => {
        res.send('Please create a new task');
    }); //create new task


// '/tasks/:id' endpoint
app.route('/tasks/:id')
    .get((req, res) => {
        res.send(`here is the ${res.body.id} task`);
    }) //access specific tasks

    .post((req, res) => {
    res.send(`update the ${res.body.id} task`);

    }) //update specific tasks

    .delete((req, res) => {
    res.send(`delete the ${res.body.id} task`);
    }); //supress specific tasks


// /tasks/:id/status
app.put('/tasks/:id/status', (req, res) => {
    res.send(`modify your ${res.body.id} task status`);

}); // modify status from specific status

// /tasks/:id/tag
app.put('/tasks/:id/tag', (req, res) => {
    res.send('modify your task tag');

}); //update status of a specific tag


// /tasks/status
app.delete('/tasks/status', (req, res) => {
    res.send('modify your task status');
}); // remove all tasks from specific status
