//Model responsible for getting the data from DB
//Refer mongoose schema types mongoosejs.com

const mongoose =require('mongoose');
const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minlength:3
    },
    _tasklistId : {
        type:mongoose.Types.ObjectId,
        require: true
    },
    completed:{
        type:Boolean,
        default:false,
        required:true
    } 
});
//_ means private type
const Task = mongoose.model('Task',TaskSchema);
module.exports = Task; 
//to export it for importing in other places.
//Always export the model not the schema.