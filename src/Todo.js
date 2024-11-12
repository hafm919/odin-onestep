import Project from './project.js'
import Task from './task.js'
export default class ProjectManager{
    static selectedProject = 'your-day';
    static projectList = {'your-day': new Project('your-day')}
    static addToProject(task){
        let project = ProjectManager.projectList[this.selectedProject]
        project.addTask(task)
    }
    static setSelectedProject(project){
        ProjectManager.selectedProject = project
    }
    static getCurrentTasks(){
        return ProjectManager.projectList[ProjectManager.selectedProject].getTasks()
    }
    static createProject(name){
        let newProject = new Project(name);
        ProjectManager.projectList[name]= newProject;
        ProjectManager.setSelectedProject(name);
        console.log()
    }
}