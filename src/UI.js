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

        ProjectManager.loadProjects();
        UI.renderProjects();
        UI.renderTasks();
        
        
    }
    static createTask(){
        const taskNameInput = document.getElementById('task-name-input');
        if(!taskNameInput.checkValidity()){
            taskNameInput.reportValidity()
            return
        }
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

        UI.renderTasks();


        
        
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
            if(!task.deleted){
                const taskCard = UI.createTaskCard(task)
                taskContainer.appendChild(taskCard);
            }
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
                if(!task.deleted){
                    const taskCard = UI.createTaskCard(task)
                    taskContainer.appendChild(taskCard);
                }
                
        });

        alltasks.forEach(task => {
            if (task.day && !task.deleted){
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
            if(!task.deleted){
                const taskCard = UI.createTaskCard(task)
                taskContainer.appendChild(taskCard);

            }
            
        });


        alltasks.forEach(task => {
            if (task.important && !task.deleted){
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
        const checkBox = UI.createCheckBox(task);
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

        if(task.done){
            taskText.classList.add('strike');
        }

        taskCard.appendChild(checkBox)
        taskCard.appendChild(taskText);
        taskCard.appendChild(taskOptions);

        return taskCard;


    }
    static createTaskOptions(task){
        const taskOptions = document.createElement('div');
        taskOptions.className = 'task-options';
        const icons = ['edit','light_mode','star','delete']
        const selectedProject = ProjectManager.getSelectedProject()


        for (let i in icons){
            if (selectedProject=='your-day' &&(icons[i]=='light_mode' || icons[i]=='star') || selectedProject=='important'&&(icons[i]=='light_mode' || icons[i]=='star')){
                        continue;
            }
            const icon = document.createElement('i');
            icon.className = 'material-icons-outlined unchecked-icon option-icon';
            icon.textContent = icons[i];
            taskOptions.appendChild(icon)
            let optionFunc = ()=>{console.log('yet to implement')};
            switch (icons[i]){
                case 'star':
                    
                    if (task.important){
                        icon.classList.add('option-important')
                        optionFunc = ProjectManager.removeFromImportant
                    }
                    else{
                        icon.classList.remove('option-important')
                        optionFunc = ProjectManager.addToImportant

                    }
                     break;
                case 'light_mode':
                    if (task.day){
                        icon.classList.add('option-day');
                        optionFunc = ProjectManager.removeFromDay
                    }
                    else{
                        icon.classList.remove('option-day');
                        optionFunc = ProjectManager.addToMyDay;
                    }
                     
                     break
                case 'delete':
                    optionFunc = ProjectManager.removeTask;
                    break;
                case 'edit':
                    optionFunc = UI.showEditDialog
                    break
            

            }
            icon.addEventListener('click',()=>{
                optionFunc(task);
                UI.renderTasks()
            })

        }
        return taskOptions;

    }

    static createCheckBox(task){
        const checkBox = document.createElement('div')
        let checkFunc = ProjectManager.finishTask
        checkBox.className = 'check-box'
        const checkIcon = document.createElement('i');
        checkIcon.className = 'material-icons-outlined unchecked-icon';
        checkIcon.textContent = 'check';

        if(task.done){
            checkFunc = ProjectManager.unfinishTask
            checkBox.classList.add('checked');
            checkIcon.classList.remove('unchecked-icon');
            checkIcon.classList.add('checked-icon');

        }
        checkBox.appendChild(checkIcon);
        



        checkBox.addEventListener('click',()=>{
            checkFunc(task)
            UI.renderTasks();
            
        })

        return checkBox
    }

    static renderProjects(){
        let projectNames = ProjectManager.getAllProjectNames();
        const projectList = document.getElementById('projects-container')
        projectList.innerHTML = '';
        for(let i in projectNames){
            let project = projectNames[i]
            if (project!='your-day'&&project!='important' && !ProjectManager.checkIfDeleted(project)){
                UI.renderProject(project)
            }
            
        }
    }

    static renderProject(projectName){
        let newProject = document.createElement('div');
        const projectList = document.getElementById('projects-container')
        newProject.className = 'project user-project';
        newProject.id = projectName;

        if(projectName==ProjectManager.getSelectedProject()){
            newProject.classList.add('selected');
        }


        const projectIcon = document.createElement('i');
        const deleteIcon = document.createElement('i')
        projectIcon.className = 'material-icons-outlined project-icon';
        projectIcon.textContent = 'receipt_long';

        deleteIcon.className = 'material-icons-outlined delete-icon';
        deleteIcon.textContent = 'delete';
        const projectTitle = document.createElement('h3');
        projectTitle.textContent = projectName;
        newProject.addEventListener('click',UI.selectProject)

        deleteIcon.addEventListener('click',(e)=>{
            let projectName = e.currentTarget.parentNode.id;
            ProjectManager.deleteProject(projectName);
            if(ProjectManager.getSelectedProject()==projectName){
                const dayProject = document.getElementById('your-day');
                dayProject.dispatchEvent(new Event('click'));
                
            }
            
            UI.renderProjects();
            e.stopPropagation();
        })
        newProject.appendChild(projectIcon);
        newProject.appendChild(projectTitle);
        newProject.appendChild(deleteIcon);
        projectList.appendChild(newProject);

        return newProject
    }
    static createProject(){
        const projectNameInput = document.getElementById('new-project-input');
        if(!projectNameInput.checkValidity()){
            projectNameInput.reportValidity()
            return
        }
        const projectName  = projectNameInput.value;
        ProjectManager.createProject(projectName)

        const newProject = UI.renderProject(projectName);
        
        UI.clearInputs([projectNameInput])
        newProject.dispatchEvent(new Event('click'));
    }
    static clearInputs(inputs){
        inputs.forEach(element => {
            element.value = ''
        });
    
    }

    static renderTasks(){
        const selectedProject = ProjectManager.getSelectedProject();
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
    static selectProject(e){
        let selectedProject = e.currentTarget
        ProjectManager.setSelectedProject(selectedProject.id);
        let projects = document.getElementsByClassName('selected')
        if(projects.length>0){
            projects[0].classList.remove('selected');
        }
        
        selectedProject.classList.add('selected');
        UI.renderTasks()
    }

    
    static showEditDialog(task){
        const editDialog = document.getElementById('editTaskDialog');
        const editTitle = document.getElementById('task-name-edit-input');
        const editDate = document.getElementById('task-date-edit-input');
        const editPriority = document.getElementById('task-edit-priority-input');
        const editForm = document.getElementById('editTaskForm');
        let editSubmit = document.getElementById('task-edit-submit');
        const newEditSubmit = editSubmit.cloneNode(true)
        editSubmit.parentNode.replaceChild(newEditSubmit,editSubmit);

        editSubmit = document.getElementById('task-edit-submit');

        editTitle.value = task.getTitle();
        editDate.value = task.getDate();
        editPriority.value = task.getPriority();

        
        editSubmit.removeEventListener
        editSubmit.addEventListener('click',(e)=>{

            if (editForm.checkValidity()) {
                let newTitle = editTitle.value
                let newDate  = editDate.value
                let newPriority = editPriority.value
            
                ProjectManager.editTask(newTitle,newDate,newPriority,task);
                UI.renderTasks();
                
            } else {
                editForm.reportValidity(); // Highlights invalid fields
            }
            
           
            
        })
        editDialog.showModal();
    }
    
    
}