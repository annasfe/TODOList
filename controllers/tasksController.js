const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

const ejs = require('ejs');
app.use(express.json());
app.set('view engine', 'ejs');



//task creator 
class TaskCreator {
    constructor (id="", content="This is a task", category="-", status="to do", emoji){
        this.id = id;
        this.content = content;
        this.category = category;
        this.status = status;
        this.emoji = emoji;
    }
}


//create an object from tasks
//const allTasks = Object.assign({}, ...allTheTasks);
//tasks array
const allTheTasks = [];
// const completedTasks = [];


function getAllTheTasks (req, res) {
    res.render('index', {allTheTasks: allTheTasks, categoriesArr: categoriesArr});
    console.log(allTheTasks);
}

function createNewTask (req, res) {
    let newId = Date.now()%10000;
    const category = addEmo(categories, req.body.selectcategory);
    if (!req.body.task == "") {
    const task = new TaskCreator(newId, req.body.task, req.body.selectcategory, req.body.status, category);
    allTheTasks.push(task);
    res.redirect('/tasks');
}
    
}


function getTaskById (req, res) {
    const reqTask = allTheTasks.filter(item => item.id === parseInt(req.params.id));
    if(reqTask != false) {res.render('task-details', {task: reqTask[0], taskId: req.params.id});}
    else {res.send(`There is not a task with ${req.params.id} id.`);}
  
}


function modifyTask (req, res) {
    const reqTask = allTheTasks.filter(item => item.id === parseInt(req.params.id));
    if(reqTask != false) {
       reqTask[0].content = req.body.task;
       reqTask[0].category = req.body.selectcategory;
       reqTask[0].status = req.body.status;
       res.send(`Task ${req.params.id} changed to: (JSON.stringify(${reqTask[0]},null,2)`);
    } else {res.send(`There is not a task with ${req.params.id} id.`);}
  
}

function deleteTask (req, res) {
    const reqTask = allTheTasks.filter(item => item.id === parseInt(req.params.id));
    if(reqTask != false) {
       allTheTasks.splice(allTheTasks.indexOf(reqTask),1);
       res.send(`Task ${req.params.id} deleted!`);
    } else {res.send(`There is not a task with ${req.params.id} id.`);}
}


///////cat object //****************************************** */

const categories = {
    Category: "",
    Home: '\u{1F3E0}',
    Important: '&#10071',
    Grocery: '&#127822',
    Care: '&#128147',
    Pet: '\u{1F436}', 
    Work: '&#128679',
    Birthday: '&#127881;',
    Healt: '&#128154',
    Urgent: '&#128165',
    Pinned: '&#128204',
    Others: '\u{1F47E}'

}


const categoriesArr = Object.keys(categories);

function addEmo(obj, category) {
    return obj[category];
   
}

//////////////////////////////////************************ */






module.exports = {getAllTheTasks, createNewTask, getTaskById, modifyTask, deleteTask};