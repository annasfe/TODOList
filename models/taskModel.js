const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    content: String,
    category: String,
    emoji: String,
    completed: {type: Boolean, default: false}
});

//here "TAsk" represents the name of the collection
module.exports = new mongoose.model("Task", taskSchema);



