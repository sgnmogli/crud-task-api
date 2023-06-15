const express = require('express');
const app = express ();
const mongoose = require('./database/mongoose');
const TaskList= require('./database/models/taskList');
const Task= require('./database/models/task');


/*CORS - cross origin request security
Backend : http://localhost:3000 
Frontend: http://localhost:4200
This will enable on request only from selected IP and Port
*/

//Alternate for below: use 3rd party lib. app.use(cors());

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect. Use * for any IP
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Example of Next Middleware
app.use(express.json()); //or 3rd party body parser already included in js. This will enable app to direcly use the json obj.

//Routes
/*
TaskList - Create, Update, ReadTaskListbyId,ReadAllTaskList
Task -  Create, Update, ReadTaskbyId,ReadAllList
*/
//Routes or REST API end points/ RESTFul webservices endpoints
//Refer : https://www.restapitutorial.com/lessons/httpmethods.html

//GetAllTaskList
//http://localhost:3000/tasklist => [{TaskList},{TaskList}]

/*app.get('/tasklists',function(req,res){
    TaskList.find({})
    .then(function(lists){res.send(lists)})
    .catch(function(error){console.log(error)});
});
*/



app.get('/tasklists',(req,res)=>{
    TaskList.find({})
        .then((lists) =>{
            res.status(200).send(lists);
            
        })
        .catch((error)=>{
            console.log(error);
            res.status(500);
        });
});
//Endpoint to get one tasklist by task list ID :http://localhost:3000/tasklists/647c50ae05533bfcd253bc7e
app.get(
    '/tasklists/:tasklistID', (req,res) =>{
        let tasklistID=req.params.tasklistID;
        TaskList.find({_id:tasklistID})
        .then((tasklist)=>{
            res.status(200).send(tasklist)
        })
        .catch((error)=>{
            console.log(error)
        });
    }
);

//Route or endpoint for creating a TaskList
app.post('/tasklists', (req,res) => {
    //console.log("Hello I am inside post method");
    console.log(req.body);
    let TaskListObj = {'title':req.body.title};  
    TaskList(TaskListObj).save()
        .then((taskList) => {
            res.status(201).send(taskList);
            
        })
        .catch((error)=>{
            console.log(error);
            res.status(500);
        });

});

//Put - full update of obj
//Patch -- only single field update
app.put('/tasklists/:tasklistID',(req,res)=>{
    TaskList.findOneAndUpdate({_id:req.params.tasklistID},{$set: req.body})
    .then((tasklist)=>{
        res.status(200).send(tasklist)
    })
    .catch((error)=>{
        console.log(error)});
});

//patch --update one field of one object  
app.patch('/tasklists/:tasklistID',(req,res)=>{
    TaskList.findOneAndUpdate({_id:req.params.tasklistID},{$set: req.body})
    .then((tasklist)=>{
        res.status(200).send(tasklist)
    })
    .catch((error)=>{
        console.log(error)});
});

//DeleteTask List by ID
app.delete('/tasklists/:tasklistID',(req,res)=>{
    TaskList.findByIdAndDelete({_id:req.params.tasklistID})
    .then((tasklist)=>{
        res.status(201).send(tasklist)
    })
    .catch((error)=>{
        console.log(error)});
});

/*app.listen(3000,function(){
    console.log("server started on port 3000")
});*/

app.listen(3000,()=> {
    console.log("server started on port 3000!")
});


