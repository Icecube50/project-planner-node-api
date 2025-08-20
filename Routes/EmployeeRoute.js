import { Router } from "express";
import { Access } from "../DatabaseAccess/gateway.js";
import { authenticateToken } from "../API/auth.js";
import { Utils} from "../Util/date_utils.js"

const employeeRouter = Router();

employeeRouter.get("/employees", authenticateToken, getEmployees);
employeeRouter.get("/employees/status/:employee", authenticateToken, getEmployeeStatus);

function getEmployees(req, res, next) {
    try{
        const result = Access().get("employees")
        res.json(result)
    }
    catch(error){
        next(error)
    }
}

function getEmployeeStatus(req, res, next) {
    try{
        const employee = req.params.employee
        var vacation = Access().get("vacations").find(it => {
            if(it.employee_id !== employee)
                return false

            const start = new Date(it.startDate)
            const end = new Date(it.endDate)
            const now = Utils.today()

            if(start <= now && end >= now)
                return true

            return false
        }) 

        if(vacation)
            res.json(true)
        else
            res.json(false)
    }
    catch(error){
        next(error)
    }
}

export default employeeRouter;
