//Model responsible for getting the data from DB
//Refer mongoose schema types mongoosejs.com

const mongoose =require('mongoose');
const TaskListSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minlength:3
    }
});

const TaskList = mongoose.model('TaskList',TaskListSchema);
module.exports = TaskList; //to export it for importing in other places.