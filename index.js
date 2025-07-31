const DummyGateway = require('./Gateway/DummyGateway.js')

const express = require('express');
const cors = require('cors')
const app = express();
const port = 8080;
const gateway = new DummyGateway()

const corsOptions = {
  origin: 'http://localhost:5173', // or your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // optional: restrict methods
  //credentials: true // if you're using cookies/auth
}

app.use(express.json())
app.use(cors(corsOptions))
app.use((err, req, res, next) => {
  console.log(err.stack) //swap for logfile later
  res.status(500).send('Internal server error.')
})

app.get('/api/projects', getProjects)
app.get('/api/projects/:id', getProjectById)
app.get('/api/projects/:date', getProjectsFromDateOnwards)
app.get('/api/projects/:id/tasks', getTasksOfProject)

app.get('/api/employees', getEmployees)

app.get('/api/assignments/:employeeId', getAssignmentForEmployee)

app.get('/api/tasks/:id', getTaskById)

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 

function getProjects(req, res, next){
    try{
      const result = gateway.getProjects()
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

function getProjectById(req, res, next){
    try{
      const projectId = req.params.id
      const result = gateway.getProjectById(projectId)
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

function getProjectsFromDateOnwards(req, res, next){
    try{
      const date = new Date(req.params.date)
      const result = gateway.getProjectsFromDateOnwards(date)
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

function getTasksOfProject(req, res, next){
    try{
      const id = req.params.id
      const result = gateway.getTasksOfProject(id)
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

function getEmployees(req, res, next){
  try{
      const result = gateway.getEmployees()
      res.json(result)
  }
  catch(error){
    next(error)
  }
}

function getAssignmentForEmployee(req, res, next){
   try{
      const id = req.params.employeeId
      const result = gateway.getAssignmentForEmployee(id)
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

function getTaskById(req, res, next){
    try{
      const id = req.params.id
      const result = gateway.getTaskById(id)
      res.json(result)
    }
    catch(error){
      next(error)
    }
}