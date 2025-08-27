import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import accountRouter from './../Routes/AccountRoutes.js'
import projectRouter from '../Routes/ProjectRoutes.js';
import employeeRouter from '../Routes/EmployeeRoute.js';
import milestoneRouter from '../Routes/MilestoneRoute.js';
import assignmentRouter from '../Routes/AssignmentRoutes.js';
import devRouter from '../Routes/DevRoute.js';

export function Run(){

    const app = express();
    const port = 8080;

    const corsOptions = {
        origin: process.env.ORIGIN, // or your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // optional: restrict methods
        credentials: true // if you're using cookies/auth
    }

    app.use(cookieParser())
    app.use(express.json())
    app.use(cors(corsOptions))
    app.use((err, req, res, next) => {
    console.log(err.stack) //swap for logfile later
        res.status(500).send('Internal server error.')
    })

    app.use("/api", accountRouter)
    app.use("/api", projectRouter)
    app.use("/api", employeeRouter)
    app.use("/api", milestoneRouter)
    app.use("/api", assignmentRouter)
    app.use("/api", devRouter)

    // Start the server
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    }); 
}