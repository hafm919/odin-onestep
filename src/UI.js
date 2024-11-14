import Task from './task.js'
import Project from './project.js'
import ProjectManager from './Todo.js'

export default class UI{
    
    static initialize(){
        const addTaskButton = document.getElementById('task-submit')
        addTaskButton.addEventListener('click',UI.createTask)
        const addProjectButton = document.getElementById('new-project-submit')
        addProjectButton.addEventListener('click',UI.createProject)

        const dayProject = document.getElementById('your-day');
        const importantProject = document.getElementById('important');
        dayProject.addEventListener('click',UI.selectProject);
        importantProject.addEventListener('click',UI.selectProject);
        
        
    }
    static createTask(){
        const taskNameInput = document.getElementById('task-name-input');
        const taskDateInput = document.getElementById('task-date-input');
        const taskPriorityInput = document.getElementById('task-priority-input');
        const taskContainer = document.getElementById('tasks-container')
        const selectedProject = ProjectManager.selectedProject

        const taskNameVal = taskNameInput.value;
        const taskDateVal = taskDateInput.value;
        const taskPriorityVal = taskPriorityInput.value;

        const newTask = new Task(taskNameVal,taskDateVal,taskPriorityVal);
        ProjectManager.addToProject(newTask);
        UI.clearInputs([taskNameInput,taskDateInput,taskPriorityInput]);

        if(selectedProject ==='your-day'){
            UI.renderDayTasks()
        }
        else if(selectedProject ==='important'){
            UI.renderImportantTasks()
        }
        else{
            UI.renderProjectTasks();
        }

        
        
    }
    
    static renderProjectTasks(){
        const hasTasks = ProjectManager.hasTasks()
        const taskContainer = document.getElementById('tasks-container');
        if (!hasTasks){
            UI.renderEmptyProject()
            return
        }

        taskContainer.classList.remove('no-tasks');
        taskContainer.innerHTML='';

        const tasks = ProjectManager.getCurrentTasks();

        tasks.forEach(task => {
            const taskCard = UI.createTaskCard(task)
            taskContainer.appendChild(taskCard);
        });
        
        
    }

    static renderDayTasks(){
        const hasTasks = ProjectManager.hasTasks() //tasks directly added to day
        let dayTasks = false // tasks added from other projects
        const taskContainer = document.getElementById('tasks-container');

        taskContainer.classList.remove('no-tasks');
        taskContainer.innerHTML='';
        const curTasks = ProjectManager.getCurrentTasks();
        const alltasks = ProjectManager.getAllTasks();

        curTasks.forEach(task => {
                const taskCard = UI.createTaskCard(task)
                taskContainer.appendChild(taskCard);
                dayTasks = true;
        });

        alltasks.forEach(task => {
            if (task.day){
                const taskCard = UI.createTaskCard(task)
                taskContainer.appendChild(taskCard);
                dayTasks = true
            }
        });

        if (!hasTasks && !dayTasks){
            UI.renderEmptyProject()
            return
        }
        

    }

    static renderImportantTasks(){
        const hasTasks = ProjectManager.hasTasks() //tasks directly added to imp
        let impTasks = false // tasks added from other projects
        const taskContainer = document.getElementById('tasks-container');

        taskContainer.classList.remove('no-tasks');
        taskContainer.innerHTML='';

        const curTasks = ProjectManager.getCurrentTasks();
        const alltasks = ProjectManager.getAllTasks();

        curTasks.forEach(task => {
            const taskCard = UI.createTaskCard(task)
            taskContainer.appendChild(taskCard);
            dayTasks = true;
        });


        alltasks.forEach(task => {
            if (task.important){
                const taskCard = UI.createTaskCard(task)
                taskContainer.appendChild(taskCard);
                impTasks = true
            }
        });

        if (!hasTasks && !impTasks){
            UI.renderEmptyProject()
            return
        }
        

    }

    static renderEmptyProject(){
        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.innerHTML = '';
        tasksContainer.classList.add('no-tasks');
        const noTasksMessage = document.createElement('p');
        noTasksMessage.innerHTML = 'One step at a time!<br>Add a new task';
        tasksContainer.appendChild(noTasksMessage);
    }

    static createTaskCard(task){
        const taskCard = document.createElement('div');
        const taskText = document.createElement('div');
        const taskTitle = document.createElement('h3');
        const taskDate = document.createElement('h3');
        const checkBox = UI.createCheckBox();
        const taskOptions = UI.createTaskOptions(task);

        taskCard.className = `task-card ${task.getPriority()}`;
        taskCard.id = task.getId();
        taskText.className = 'task-text-container';
        taskTitle.innerHTML = task.getTitle();
        taskTitle.className = 'task-text';
        taskDate.innerHTML = task.getDate();
        taskDate.className = 'task-text';

        taskText.appendChild(taskTitle);
        taskText.appendChild(taskDate);

        taskCard.appendChild(checkBox)
        taskCard.appendChild(taskText);
        taskCard.appendChild(taskOptions);

        return taskCard;


    }
    static createTaskOptions(task){
        const taskOptions = document.createElement('div');
        taskOptions.className = 'task-options';
        const icons = ['edit','light_mode','star','delete']

        for (let i in icons){
            const icon = document.createElement('i');
            icon.className = 'material-icons-outlined unchecked-icon option-icon';
            icon.textContent = icons[i];
            taskOptions.appendChild(icon)
            let optionFunc = ()=>{console.log('yet to implement')};
            switch (icons[i]){
                case 'star':
                     optionFunc = ProjectManager.addToImportant
                     break;
                case 'light_mode':
                     optionFunc = ProjectManager.addToMyDay;
            }
            icon.addEventListener('click',()=>{
                optionFunc(task);
            })

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
        if(selectedProject.id ==='your-day'){
            UI.renderDayTasks()
        }
        else if(selectedProject.id ==='important'){
            UI.renderImportantTasks()
        }
        else{
            UI.renderProjectTasks();
        }
        


    }
    
}