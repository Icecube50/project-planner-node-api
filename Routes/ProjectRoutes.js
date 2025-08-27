import { Router } from "express";
import { authenticateToken } from "../API/auth.js";
import pool from "../DatabaseAccess/postgresGateway.js";

const projectRouter = Router();

projectRouter.get('/projects/:date', authenticateToken, getProjectsAfter)

async function getProjectsAfter(req, res, next){
  const client = await pool.connect();
  try{
    const date = req.params.date
    const query = await client.query("SELECT f_get_projects_after($1)", [date])
    const result = query.rows[0].f_get_projects_after

    res.json(result)
  }
  catch(error){
    next(error)
  }
  finally{
    client.release()
  }
}

export default projectRouter;
