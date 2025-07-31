const projects = require('../DummyData/projects.json')
const tasks = require('../DummyData/tasks.json')
const employees = require('../DummyData/employees.json')
const assignments = require('../DummyData/assignments.json')

class DummyGateway {

    getProjects(){
        return projects
    }

    getProjectById(id){
        return projects.filter(prj => prj.prjId === id)
    }

    getProjectsFromDateOnwards(date) {
        return projects.filter(prj => prj.startDate >= date || prj.endDate >= date)
    }

    getTasksOfProject(id) {
        return tasks.filter(task => task.prjId === id)
    }

    getEmployees() {
        return employees
    }

    getAssignmentForEmployee(employeeId){
        return assignments.filter(it => it.employeeId === employeeId)
    }

    getTaskById(taskId){
        return tasks.filter(task => task.taskId === taskId)
    }
} 

module.exports = DummyGateway