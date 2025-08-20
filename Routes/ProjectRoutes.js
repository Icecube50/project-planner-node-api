import { Router } from "express";
import { Access } from "../DatabaseAccess/gateway.js";
import { authenticateToken } from "../API/auth.js";

const projectRouter = Router();

projectRouter.get('/projects', authenticateToken, getProjects)
projectRouter.get('/projects/:id/milestones', authenticateToken, getProjectMilestones)
//app.get('/api/projects/:id', route_getProjectById)
//app.get('/api/projects/:date', route_getProjectsFromDateOnwards)

function getProjects(req, res, next){
    try{
      const result = Access().get("projects")
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

function getProjectMilestones(req, res, next){
    try{
      const id = req.params.id
      const result = Access().get("milestones").filter(it => it.project_id === id)
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

export default projectRouter;
