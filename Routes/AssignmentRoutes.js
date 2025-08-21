import { Router } from "express";
import { Access } from "../DatabaseAccess/gateway.js";
import { authenticateToken } from "../API/auth.js";

const assignmentRouter = Router();

assignmentRouter.get("/assignments", authenticateToken, getAssignments);
assignmentRouter.get("/assignments/:employee", authenticateToken, getEmployeeAssignments);
assignmentRouter.get("/assignments/projects/:employee", authenticateToken, getAssignedProjects);

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
    try {
        const employee = req.params.employee
        const result = Access().get("assignments").filter(it => it.employee_id === employee)
        res.json(result)
    }
    catch (error) {
        next(error)
    }
}

function getAssignedProjects(req, res, next) {
    try {
        const employee = req.params.employee
        const result = []
        var assignments = Access().get("assignments").filter(it => it.employee_id === employee)
        for (let assignment of assignments) {
            var task = Access().get("tasks").find(it => it.task_id === assignment.task_id)
            var milestone = Access().get("milestones").find(it => it.milestone_id === task.milestone_id)
            var project = Access().get("projects").find(it => it.project_id === milestone.project_id)
            
            result.push({ from: assignment.startDate, to: assignment.endDate, hours: assignment.hoursPerDay, task: task.name, prj: project})
        }
        
        res.json(result)
    }
    catch (error) {
        next(error)
    }
}


export default assignmentRouter;
