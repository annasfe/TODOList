const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

app.use(express.static('public'));
app.use(express.json())
app.set('view engine', 'ejs')

const port = 3000
const hostName = 'localhost'

app.listen(port, hostName, (err) => {
    if (err) console.log("Something went wrong " + err );
    else console.log(`Server running on port ${port}...`);
})

//Database
// let taskDatabaseJSON = [] 
const taskDatabaseJSON = fs.readFileSync('public/storage.json')
const taskJson = JSON.parse(taskDatabaseJSON) // convert in JSON format


// let typicalEntry = {
//    id: //number for each new entry it will be = Date.now() to have unique IDs
//    action: //plain text of the task
//    status: //automatically set to TODO but with further action (PUT) could be modify
//}


// '/' endpoint

app.get('/', (req,res) => {
    // res.render('index', { name: "ML" });
})

// '/tasks/' endpoint
app.route('/tasks')
    .get((req, res) => { //access all tasks
        if (taskJson) {
            console.log(taskJson)
            return res.send(taskJson)
        } return res.send("No task yet")
    // res.render('index', { tasksArray: taskDatabase });
    })

    .post((req, res) => { //create new task
        let newEntry = {
            id: Date.now(),
            action: req.body.action,
            status: "todo"
        }
        taskJson.push(newEntry);
        const newData = JSON.stringify(taskJson) //back to row format
        fs.writeFile("public/storage.json", newData, (err) => {
            if (err) throw err;
            console.log("New data added");
          });
        res.status(200)  
        res.send(`${newEntry.action} added`);
});

// '/tasks/:id' endpoint

//TO DO FIX THE GET FOR '/tasks/:id'
app.route('/tasks/:id')
    .get((req, res) => { //access specific tasks
        
        const task = taskJson.filter(element => element.id === parseInt(req.params.id));
        console.log(task)
        res.send(task);
    }) 

    .put((req, res) => { //update specific tasks

        let index = taskJson.findIndex( element => element.id === parseInt(req.params.id))

        taskJson[index].status = req.body.status || taskJson[index].status
        taskJson[index].action = req.body.action || taskJson[index].action
        res.send(`Task ${req.params.id} has been updated`);

    }) 

    .delete((req, res) => { //supress specific tasks
        let index = taskJson.findIndex( element => element.id === parseInt(req.params.id))
        if (index) {
            taskJson.splice(index, 1)
            return res.send(`Task ${req.params.id} has been deleted`);
        } return res.send("This task doesn't exist")
    }); 

    //TODO check later if i can change that
// // /tasks/:status
// app.delete('/tasks/:status', ((req, res) => { // remove all tasks from specific status
//     let filterArray = taskDatabase.filter((element) => {toString(element.status) !== toString(req.params.status)})
//     taskDatabase = filterArray
    
//     // taskDatabase.forEach(function(elem) {
//     //     if(elem.status === req.query.status) {
//     //         taskDatabase.splice(taskDatabase.indexOf(elem), 1);
//     //     }
//     // })    

//     return res.send(`All ${req.params.status} have been removed from the list`);
// })); 