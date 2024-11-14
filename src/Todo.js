import Project from './project.js'
import Task from './task.js'
export default class ProjectManager{
    static selectedProject = 'your-day';
    static projectList = {'your-day': new Project('your-day'),'important': new Project('important')}
    static allTasks = []
    static addToProject(task){
        let project = ProjectManager.projectList[ProjectManager.selectedProject]
        ProjectManager.allTasks.push(task)
        project.addTask(task)
    }

    static addToImportant(task){
        task.addTaskToImportant();
    }

    static addToMyDay(task){
        task.addTaskToMyDay();
    }

    static getSelectedProject(){
        return ProjectManager.selectedProject;
    }
    static setSelectedProject(project){
        ProjectManager.selectedProject = project
    }
    static getCurrentTasks(){
        return ProjectManager.projectList[ProjectManager.selectedProject].getTasks()
    }
    static getAllTasks(){
        return ProjectManager.allTasks;
    }
    static createProject(name){
        let newProject = new Project(name);
        ProjectManager.projectList[name]= newProject;
        ProjectManager.setSelectedProject(name);
        console.log()
    }
    static hasTasks(){
        if (ProjectManager.getCurrentTasks().length>0){
            
            return true
        }
        console.log(ProjectManager.getCurrentTasks());
        return false

    }
}