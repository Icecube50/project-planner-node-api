import { Router } from "express";
import { Access } from "../DatabaseAccess/gateway.js";
import { authenticateToken } from "../API/auth.js";

const milestoneRouter = Router();

milestoneRouter.get('/milestones', authenticateToken, getMilestones)
milestoneRouter.get('/milestones/:id/tasks', authenticateToken, getMilestonesTasks)
//app.get('/api/projects/:id', route_getProjectById)
//app.get('/api/projects/:date', route_getProjectsFromDateOnwards)

function getMilestones(req, res, next){
    try{
      const result = Access().get("milestones")
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

function getMilestonesTasks(req, res, next){
    try{
      const id = req.params.id
      const result = Access().get("tasks").filter(it => it.milestone_id === id)
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

export default milestoneRouter;
