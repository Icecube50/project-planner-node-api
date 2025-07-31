const projects = require('../DummyData/projects.json')
const tasks = require('../DummyData/tasks.json')

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
} 

module.exports = DummyGateway