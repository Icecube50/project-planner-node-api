import fs from "fs"
import bcrypt from "bcryptjs";

export function Load(){
    const db = {
        users: [],
        employees: [],
        teams: [],
        projects: [],
        milestones: [],
        tasks: [],
        assignments: [],
    }

    const files = fs.readdirSync(process.env.DATABASE_URL);
    for (var file of files){
        const raw = fs.readFileSync(`${process.env.DATABASE_URL}\\${file}`, "utf-8");
        const data = JSON.parse(raw);

        switch (file){
            case "users.json":
                for (var user of data){
                    user.password = bcrypt.hashSync(user.password, 8)
                }
                db.users = data
                break
                
            case "employees.json":
                db.employees = data
                break

            case "teams.json":
                db.teams = data
                break

            case "projects.json":
                db.projects = data
                break

            case "milestones.json":
                db.milestones = data
                break

            case "tasks.json":
                db.tasks = data
                break

            case "assignments.json":
                db.assignments = data
                break

            default:
                break;
        }
    }

    return db
}

export function Save(){

}
