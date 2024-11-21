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
    static removeFromImportant(task){
        task.removeFromImportant()
    }

    static addToMyDay(task){
        task.addTaskToMyDay();
    }
    static removeFromDay(task){
        task.removeFromDay();
    }

    static removeTask(task){
        const selectedProject = ProjectManager.getSelectedProject()
        if (selectedProject=='your-day' && task.day){
            task.removeFromDay();
        }
        else if (selectedProject=='important' && task.important){
            task.removeFromImportant();
        }
        else{
            task.remove();
            ProjectManager.projectList[selectedProject].removeTask()
        }
        
    }

    static finishTask(task){
        task.finish()
    }
    static unfinishTask(task){
        task.unfinish()
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
        return ProjectManager.projectList[ProjectManager.getSelectedProject()].hasTasks();
    }
    
    static editTask(newTitle,newDate,newPriority,task){
        task.setTitle(newTitle);
        task.setDate(newDate);
        task.setPriority(newPriority);
    }
}