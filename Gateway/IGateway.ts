export interface IGateway{
    getProjects()
    getProjectById(id: number)
    getProjectsFromDateOnwards(date: Date)
    getTasksOfProject(id: number)
}