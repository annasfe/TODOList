const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const fs = require('fs');


const taskModel = require("../models/taskModel");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

const ejs = require('ejs');

app.use(express.json());
app.set('view engine', 'ejs');


// const completedTasks = [];  ---> I think i dont need this anymore


//Get all tasks
async function getAllTheTasks (req, res) {
    try {
    const allTheTasks = await taskModel.find({});
    console.log(allTheTasks);
    res.render('index', {allTheTasks: allTheTasks, categoriesArr: categoriesArr});
    } catch (err) {
        console.log(err)
        }
    };
  
 //create new  
async function createNewTask (req, res) {
    try {
    const task = await taskModel.create({
        content: req.body.task,
        category: req.body.selectcategory,
        emoji: addEmo(categories, req.body.selectcategory)
    })
    
    console.log(task);
    res.redirect('/tasks');
} catch (err) {
    console.log(err)
    
}

}
    
//get tasks by category
async function getTaskByCategory (req, res) {
        try {
        const allTheTasks = await taskModel.find({category: req.params.category});
        console.log(allTheTasks);
        res.render('index', {allTheTasks: allTheTasks, categoriesArr: categoriesArr});
        } catch (err) {
            console.log(err)
            }
        };



//TODO get by status
async function getTaskByStatus (req, res) {
    try {
    const allTheTasks = await taskModel.find({completed: false});
    console.log(allTheTasks);
    res.render('index', {allTheTasks: allTheTasks, categoriesArr: categoriesArr});
    } catch (err) {
        console.log(err)
        }
    };




    //TODO 
    // async function setCompleted (req, res) {
    //     fetch ("/tasks", {
    //         method: "PUT",
    //         headers: {'content-type': 'application/json'}, 
    //         body: JSON.stringify({
    //             completed: true
    //         })
    //     })
    //     .then(data => console.log(data))
    //     .then(res => res.redirected('/tasks'))
       

    //     };







    //DElete all the tasks
async function emptyList (req, res) {
    taskModel.deleteMany()
    .then(()=>{
        res.redirect('/tasks');
    })
    .catch((err) => {
        console.log(err);
    })   
}



// TO DO: delete completed tasks

// function deleteCompleted (req, res) {
//     var completedTasks = req.body.checkCompleted;
//     if (typeof completedTasks === 'string') {
        
//         res.redirect('/tasks');

//     } else if (typeof completedTasks === 'array') {
//         for (let i of completedTasks) {
//             allTheTasks.splice(i, 1)
//             res.redirect('/tasks');
//         }
//     }
    
//     console.log(completedTasks.length);
  
//        res.redirect('/tasks');
    
    
// }




///////cat object //****************************************** */

const categories = {
    category: "",
    home: '\u{1F3E0}',
    important: '\u{2757}',
    grocery: '\u{1F34E}',
    care: '\u{1F493}',
    pet: '\u{1F436}', 
    work: '\u{1F6A7}',
    birthday: '\u{1F389}',
    healt: '\u{1F49A}',
    urgent: '\u{1F4A5}',
    pinned: '\u{1F4CC}',
    others: '\u{1F47E}'

}


const categoriesArr = Object.keys(categories);

function addEmo(obj, category) {
    return obj[category];
   
}

//////////////////////////////////************************ */






module.exports = {getAllTheTasks, createNewTask, getTaskByCategory, getTaskByStatus, emptyList};