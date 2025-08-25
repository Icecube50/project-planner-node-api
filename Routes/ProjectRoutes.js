import { Router } from "express";
import { Access } from "../DatabaseAccess/gateway.js";
import { authenticateToken } from "../API/auth.js";

const projectRouter = Router();

projectRouter.get('/projects', authenticateToken, getProjects)
projectRouter.get('/projects/:id/assignment', authenticateToken, getAssignments)
projectRouter.post('/projects/create', authenticateToken, createProject)

function createProject(req, res, next){
    try{
        Access().create("projects", req.body.payload)
        res.status(200)
    }
    catch(error){
        next(error)
    }
}

function getProjects(req, res, next){
    try{
      const result = Access().get("projects")
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

function getAssignments(req, res, next){
  try{
    const result = {
      tasks: [],
      assignments: [],
      employees: [],
      vacations: []
    }

    const employees = new Map()

    const id = req.params.id
    const tasks = Access().get("tasks").filter(it => it.project_id === id)
    for(var task of tasks){
        result.tasks.push(task)

        const assigns = Access().get("assignments").filter(it => it.task_id === task.task_id)
        for(var assign of assigns){
          result.assignments.push(assign)
          
          const employee = Access().get("employees").find(it => it.employee_id === assign.employee_id)
          if(!employees.has(employee.employee_id))
            employees.set(employee.employee_id, employee)
          
          const vacations = Access().get("vacations").filter(it => it.employee_id === assign.employee_id)
          for(var vacation of vacations){
            var start = new Date(vacation.startDate)
            var end = new Date(vacation.endDate)

            var workStart = new Date(assign.startDate)
            var workEnd = new Date(assign.endDate)

            if(start >= workStart || end <= workEnd)
              result.vacations.push(vacation)
          }
        }
    }

    for(var e of  employees.values())
      result.employees.push(e)
    res.json(result)
  }
  catch(error){
    next(error)
  }
}

export default projectRouter;
