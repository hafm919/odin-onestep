import './styles.css';
import logo from './logo.png';

import UI from './UI.js'

function initializeHome() {
    // Create sidebar
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';

    // Logo container
    const logoContainer = document.createElement('div');
    logoContainer.className = 'logo-container';
    const logoImage = document.createElement('img');
    logoImage.src = logo
    logoImage.height = 150;
    logoImage.alt = '';
    logoContainer.appendChild(logoImage);
    sidebar.appendChild(logoContainer);

    // Day and Important project containers
    const dayImpContainer = document.createElement('div');
    dayImpContainer.className = 'day-imp-container';

    const dayProject = document.createElement('div');
    dayProject.className = 'project selected';
    const dayIcon = document.createElement('i');
    dayIcon.className = 'material-icons-outlined day-icon';
    dayIcon.textContent = 'light_mode';
    const dayTitle = document.createElement('h3');
    dayTitle.textContent = 'Your day';
    dayProject.appendChild(dayIcon);
    dayProject.appendChild(dayTitle);

    const importantProject = document.createElement('div');
    importantProject.className = 'project';
    const importantIcon = document.createElement('i');
    importantIcon.className = 'material-icons-outlined imp-icon';
    importantIcon.textContent = 'star';
    const importantTitle = document.createElement('h3');
    importantTitle.textContent = 'Important';
    importantProject.appendChild(importantIcon);
    importantProject.appendChild(importantTitle);

    dayImpContainer.appendChild(dayProject);
    dayImpContainer.appendChild(importantProject);
    dayImpContainer.appendChild(document.createElement('hr'));

    sidebar.appendChild(dayImpContainer);

    const projectsContainer = document.createElement('div');
    projectsContainer.id = 'projects-container';
    sidebar.appendChild(projectsContainer);

    // New project input container
    const newProject = document.createElement('div');
    newProject.className = 'new-project';

    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';
    const newProjectInput = document.createElement('input');
    newProjectInput.type = 'text';
    newProjectInput.id = 'new-project-input';
    newProjectInput.placeholder = 'new project';
    inputContainer.appendChild(newProjectInput);

    const projectSubmit = document.createElement('div');
    projectSubmit.id = 'new-project-submit';
    projectSubmit.className = 'submit';
    const addIcon = document.createElement('i');
    addIcon.className = 'material-icons-outlined add-icon';
    addIcon.textContent = 'add';
    projectSubmit.appendChild(addIcon);

    newProject.appendChild(inputContainer);
    newProject.appendChild(projectSubmit);
    sidebar.appendChild(newProject);

    // Main container
    const main = document.createElement('div');
    main.className = 'main';

    // Add tasks container
    const addTasksContainer = document.createElement('div');
    addTasksContainer.className = 'add-tasks-container';

    const taskNameInput = document.createElement('input');
    taskNameInput.className = 'task-input';
    taskNameInput.type = 'text';
    taskNameInput.id = 'task-name-input';
    taskNameInput.placeholder = 'what do you want to do?';

    const taskDateInput = document.createElement('input');
    taskDateInput.className = 'task-input';
    taskDateInput.id = 'task-date-input';
    taskDateInput.type = 'date';

    const prioritySelect = document.createElement('select');
    prioritySelect.id = 'task-priority-input';
    const priorityPlaceholder = document.createElement('option');
    priorityPlaceholder.value = '';
    priorityPlaceholder.disabled = true;
    priorityPlaceholder.selected = true;
    priorityPlaceholder.hidden = true;
    priorityPlaceholder.textContent = 'Priority';
    prioritySelect.appendChild(priorityPlaceholder);

    ['high', 'medium', 'low'].forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
        prioritySelect.appendChild(option);
    });

    const taskSubmit = document.createElement('div');
    taskSubmit.id = 'task-submit';
    taskSubmit.className = 'submit';
    const taskAddIcon = document.createElement('i');
    taskAddIcon.className = 'material-icons-outlined add-icon';
    taskAddIcon.textContent = 'add';
    taskSubmit.appendChild(taskAddIcon);

    addTasksContainer.appendChild(taskNameInput);
    addTasksContainer.appendChild(taskDateInput);
    addTasksContainer.appendChild(prioritySelect);
    addTasksContainer.appendChild(taskSubmit);

    // Tasks container
    const tasksContainer = document.createElement('div');
    tasksContainer.className = 'tasks-container no-tasks';
    const noTasksMessage = document.createElement('p');
    noTasksMessage.innerHTML = 'One step at a time!<br>Add a new task';
    tasksContainer.appendChild(noTasksMessage);

    main.appendChild(addTasksContainer);
    main.appendChild(tasksContainer);

    // Append sidebar and main to the document body
    document.body.appendChild(sidebar);
    document.body.appendChild(main);

    UI.initialize()
}

initializeHome();


