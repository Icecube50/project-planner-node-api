import { Router } from "express";
import { Access } from "../DatabaseAccess/gateway.js";
import { authenticateToken } from "../API/auth.js";

const employeeRouter = Router();

employeeRouter.get("/employees", authenticateToken, getEmployees);

function getEmployees(req, res, next) {
    try{
      const result = Access().get("employees")
      res.json(result)
    }
    catch(error){
      next(error)
    }
}

export default employeeRouter;
