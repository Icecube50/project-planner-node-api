import { Router } from "express";
import { Access } from "../DatabaseAccess/gateway.js";
import { authenticateToken } from "../API/auth.js";

const assignmentRouter = Router();

assignmentRouter.get("/assignments", authenticateToken, getAssignments);
assignmentRouter.get("/assignments/:employee", authenticateToken, getEmployeeAssignments);

function getAssignments(req, res, next) {
    try {
        const result = Access().get("assignments")
        res.json(result)
    }
    catch (error) {
        next(error)
    }
}

function getEmployeeAssignments(req, res, next) {
    try{
        const result = {
            tasks: [],
            assignments: [],
            vacations: []
        }

        const id = req.params.employee

        const vacations = Access().get("vacations").filter(it => it.employee_id === id)
        result.vacations = vacations

        const assigns = Access().get("assignments").filter(it => it.employee_id === id)
        for(var assign of assigns){
            result.assignments.push(assign)
            
            const task = Access().get("tasks").find(it => it.task_id === assign.task_id)
            result.tasks.push(task)
        }

        res.json(result)
  }
  catch(error){
    next(error)
  }
}

export default assignmentRouter;
