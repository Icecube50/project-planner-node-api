import { DummyGateway } from './Gateway/DummyGateway';

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
app.get('api/projects/:id', getProjectById)
app.get('api/projects/:date', getProjectsFromDateOnwards)
app.get('api/projects/:id/tasks', getTasksOfProject)


// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 

function getProjects(req, res){
    try{
      const result = gateway.getProjects()
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

function getProjectById(req, res){
    try{
      const projectId = req.params.id
      const result = gateway.getProjectById(projectId)
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

function getProjectsFromDateOnwards(req, res){
    try{
      const date = new Date(req.params.date)
      const result = gateway.getProjectsFromDateOnwards(date)
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

function getTasksOfProject(req, res){
    try{
      const id = req.params.id
      const result = gateway.getTasksOfProject(id)
      res.json(result)
    }
    catch(error){
      next(error)
    }
}