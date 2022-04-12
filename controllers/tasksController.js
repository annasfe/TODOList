//const { ObjectId } = require('mongodb');
let Task = require('../models/taskModel')

async function createTask(req, res) {

    // let task = new Task({
    //     task: req.body.newtask
    //   })
    // try {
    //     await task.save();
    //     console.log("Task saved!")
    //     res.redirect("/");
    // }
    // catch(err) {
    //         console.error(err.message);
    // } 
    //or use create instead!
    try{
        const task = await Task.create({task: req.body.newtask});
        res.redirect("/");
    }catch(err) {
        console.error(err.message);
     }

    // and you don't need to call save(), it is included in the create
    
    //  //with promise      
    //   task.save()
    //      .then(task => {
    //        console.log(task)
    //        res.redirect("/");
    //      })
    //      .catch(err => {
    //        console.error(err)
    //      })      
};

function removeTask(req, res) {

    var completeTask = req.body.check;

    if(typeof(completeTask)=="object") {        //if more than one tasks selected, then we deal with array     
        for (var i = 0; i < completeTask.length; i++) {

            Task.deleteOne( {_id: completeTask[i]}, function (error){
                if (error) console.log(error);
                res.redirect("/");
            });
        }
    }
    else {
        Task.deleteOne( {_id: completeTask}, function(error){
            if (error) console.log(error);
            res.redirect("/");
        });
    }
};

function deleteAll(req, res) {
    Task.deleteMany({})
    .then(() => {
        res.redirect("/");
    })
    .catch(error => {
        console.log(error);
        next(error);
    });
};

function getTasks(req, res) {
    Task.find().sort('task').limit(10)
    .then(task => {
        console.log(task);
        res.render( 'index', {task : task});
      })
    .catch(error => {
        console.log(error);
        next(error);
    });
};

module.exports = {getTasks, deleteAll, removeTask, createTask}