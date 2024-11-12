import Task from './task.js'
import Project from './project.js'
import ProjectManager from './Todo.js'

export default class UI{
    
    static initialize(){
        const addTaskButton = document.getElementById('task-submit')
        addTaskButton.addEventListener('click',UI.createTask)
        const addProjectButton = document.getElementById('new-project-submit')
        addProjectButton.addEventListener('click',UI.createProject)
        
        
    }
    static createTask(){
        const taskNameInput = document.getElementById('task-name-input');
        const taskDateInput = document.getElementById('task-date-input');
        const taskPriorityInput = document.getElementById('task-priority-input');

        const taskName = taskNameInput.value
        const taskDate = taskDateInput.value
        const taskPriority = taskPriorityInput.value

        const newTask = new Task(taskName,taskDate,taskPriority)
        ProjectManager.addToProject(newTask)
        console.log(ProjectManager.getCurrentTasks())
        UI.clearInputs([taskNameInput,taskDateInput,taskPriorityInput])
        

        
    }
    static createProject(){
        const projectNameInput = document.getElementById('new-project-input');
        const projectName  = projectNameInput.value;
        ProjectManager.createProject(projectName);
        let newProject = document.createElement('div');
        const projectList = document.getElementById('projects-container')
        newProject.className = 'project user-project';
        newProject.id = projectName;
        const projectIcon = document.createElement('i');
        projectIcon.className = 'material-icons-outlined project-icon';
        projectIcon.textContent = 'receipt_long';
        const projectTitle = document.createElement('h3');
        projectTitle.textContent = projectName;
        newProject.addEventListener('click',UI.selectProject)
        
        
        newProject.appendChild(projectIcon);
        newProject.appendChild(projectTitle);
        projectList.appendChild(newProject);
        UI.clearInputs([projectNameInput])
        newProject.dispatchEvent(new Event('click'));
       
        

    }
    static clearInputs(inputs){
        inputs.forEach(element => {
            element.value = ''
        });
    
    }
    static selectProject(e){
        let selectedProject = e.currentTarget
        ProjectManager.setSelectedProject(selectedProject.id);
        let projects = document.getElementsByClassName('selected')
        projects[0].classList.remove('selected');
        selectedProject.classList.add('selected');
        console.log(ProjectManager.selectedProject)
    }
    
}