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
        const taskContainer = document.getElementById('tasks-container')
        const hasTasks = ProjectManager.hasTasks()
        if (!hasTasks){
            taskContainer.classList.remove('no-tasks');
            taskContainer.innerHTML='';
        }
        

        const taskNameVal = taskNameInput.value;
        const taskDateVal = taskDateInput.value;
        const taskPriorityVal = taskPriorityInput.value;

        const newTask = new Task(taskNameVal,taskDateVal,taskPriorityVal);
        ProjectManager.addToProject(newTask);
        console.log(ProjectManager.getCurrentTasks());
        UI.clearInputs([taskNameInput,taskDateInput,taskPriorityInput]);

        const taskCard = UI.createTaskCard(newTask);
        taskContainer.appendChild(taskCard);
        

        
    }

    static createTaskCard(task){
        const taskCard = document.createElement('div');
        const taskTitle = document.createElement('h3');
        const taskDate = document.createElement('h3');
        const checkBox = UI.createCheckBox();
        const taskOptions = UI.createTaskOptions();
        taskCard.className = `task-card ${task.getPriority()}`;
        taskTitle.innerHTML = task.getTitle();
        taskTitle.className = 'task-text';
        taskDate.innerHTML = task.getDate();
        taskDate.className = 'task-text';

        taskCard.appendChild(checkBox)
        taskCard.appendChild(taskTitle);
        taskCard.appendChild(taskDate);
        taskCard.appendChild(taskOptions);

        return taskCard;


    }
    static createTaskOptions(){
        const taskOptions = document.createElement('div');
        taskOptions.className = 'task-options';
        const icons = ['edit','light_mode','star','delete']

        for (let i in icons){
            const icon = document.createElement('i');
            icon.className = 'material-icons-outlined unchecked-icon option-icon';
            icon.textContent = icons[i];
            taskOptions.appendChild(icon)
        }
        return taskOptions;

    }

    static createCheckBox(){
        const checkBox = document.createElement('div')
        checkBox.className = 'check-box'
        const checkIcon = document.createElement('i');
        checkIcon.className = 'material-icons-outlined unchecked-icon';
        checkIcon.textContent = 'check';

        checkBox.appendChild(checkIcon);

        return checkBox
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