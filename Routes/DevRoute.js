import { Router } from "express";
import { Access } from "../DatabaseAccess/gateway.js";
const devRouter = Router();

devRouter.post('/dev/users', setUsers)
devRouter.post('/dev/assignments', setAssignments)
devRouter.post('/dev/employees', setEmployees)
devRouter.post('/dev/milestones', setMilestones)
devRouter.post('/dev/projects', setProjects)
devRouter.post('/dev/tasks', setTasks)
devRouter.post('/dev/teams', setTeams)

function setUsers(req, res, next){
  try{
    Access().set("users", req.body.payload)
    res.status(200)
  }
  catch(error){
    next(error)
  }
}

function setAssignments(req, res, next){
  try{
    Access().set("assignments", req.body.payload)
    res.status(200)
  }
  catch(error){
    next(error)
  }
}

function setEmployees(req, res, next){
  try{
    Access().set("employees", req.body.payload)
    res.status(200)
  }
  catch(error){
    next(error)
  }
}

function setMilestones(req, res, next){
  try{
    Access().set("milestones", req.body.payload)
    res.status(200)
  }
  catch(error){
    next(error)
  }
}

function setProjects(req, res, next){
  try{
    Access().set("projects", req.body.payload)
    res.status(200)
  }
  catch(error){
    next(error)
  }
}

function setTasks(req, res, next){
  try{
    Access().set("tasks", req.body.payload)
    res.status(200)
  }
  catch(error){
    next(error)
  }
}

function setTeams(req, res, next){
  try{
    Access().set("teams", req.body.payload)
    res.status(200)
  }
  catch(error){
    next(error)
  }
}

export default devRouter;
