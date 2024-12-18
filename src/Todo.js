import Project from "./project.js";
import Task from "./task.js";
import UI from "./UI.js";
export default class ProjectManager {
  static selectedProject = "your-day";
  static projectList = {
    "your-day": new Project("your-day"),
    important: new Project("important"),
  };
  static allTasks = [];
  static addToProject(task) {
    let project = ProjectManager.projectList[ProjectManager.selectedProject];
    project.addTask(task);
    ProjectManager.allTasks.push(task);
  }

  static loadProjects() {
    let storedProjectList = localStorage.getItem("projectList");
    storedProjectList = JSON.parse(storedProjectList);

    for (const projectName in storedProjectList) {
      if (storedProjectList[projectName]["deleted"]) {
        continue;
      }
      let project = new Project(projectName);
      ProjectManager.projectList[projectName] = project;

      let tasks = storedProjectList[projectName]["tasks"];
      for (let i in tasks) {
        if (!tasks[i]["deleted"]) {
          let task = ProjectManager.createTaskFromObject(tasks[i]);
          ProjectManager.projectList[projectName].addTask(task);
          ProjectManager.allTasks.push(task);
        }
      }
    }
  }

  static createTaskFromObject(obj) {
    return new Task(
      obj["title"],
      obj["date"],
      obj["priority"],
      obj["done"],
      obj["day"],
      obj["important"]
    );
  }

  static storeProjects() {
    localStorage.setItem(
      "projectList",
      JSON.stringify(ProjectManager.projectList)
    );
    localStorage.setItem("allTask", JSON.stringify(ProjectManager.allTasks));
  }

  static addToImportant(task) {
    task.addTaskToImportant();
  }
  static removeFromImportant(task) {
    task.removeFromImportant();
  }

  static addToMyDay(task) {
    task.addTaskToMyDay();
  }
  static removeFromDay(task) {
    task.removeFromDay();
  }

  static removeTask(task) {
    const selectedProject = ProjectManager.getSelectedProject();
    if (selectedProject == "your-day" && task.day) {
      task.removeFromDay();
    } else if (selectedProject == "important" && task.important) {
      task.removeFromImportant();
    } else {
      task.remove();
      ProjectManager.projectList[selectedProject].removeTask();
    }
  }

  static getAllProjectNames() {
    const projectNames = [];
    for (let i in ProjectManager.projectList) {
      if (!ProjectManager.projectList[i]["deleted"]) {
        projectNames.push(i);
      }
    }
    console.log(projectNames);
    return projectNames;
  }

  static finishTask(task) {
    task.finish();
  }
  static unfinishTask(task) {
    task.unfinish();
  }

  static getSelectedProject() {
    return ProjectManager.selectedProject;
  }
  static setSelectedProject(project) {
    ProjectManager.selectedProject = project;
  }
  static deleteProject(projectName) {
    let project = ProjectManager.projectList[projectName];
    let tasks = project.getTasks();
    for (let i in tasks) {
      tasks[i].remove();
    }
    project.remove();
  }
  static checkIfDeleted(project) {
    return ProjectManager.projectList[project].deleted;
  }
  static getCurrentTasks() {
    return ProjectManager.projectList[
      ProjectManager.selectedProject
    ].getTasks();
  }
  static getAllTasks() {
    return ProjectManager.allTasks;
  }
  static createProject(name) {
    let newProject = new Project(name);
    ProjectManager.projectList[name] = newProject;
    ProjectManager.setSelectedProject(name);
  }
  static hasTasks() {
    return ProjectManager.projectList[
      ProjectManager.getSelectedProject()
    ].hasTasks();
  }

  static editTask(newTitle, newDate, newPriority, task) {
    task.setTitle(newTitle);
    task.setDate(newDate);
    task.setPriority(newPriority);
  }
}
