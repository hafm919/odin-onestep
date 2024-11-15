export default class Task{
    static globalTaskId = 0;
    constructor(title, date, priority) {
        this.title = title
        this.date = date
        this.priority = priority;
        this.id = Task.globalTaskId++;
        this.done = false;
        this.day = false
        this.important = false
        this.deleted = false
    }
    getTitle(){
        return this.title
    }
    addTaskToMyDay(){
        this.day = true;
    }
    removeFromDay(){
        this.day = false
    }
    addTaskToImportant(){
        this.important = true;
    }
    removeFromImportant(){
        this.important = false
    }
    
    getDate(){
        return this.date
    }
    getPriority(){
        return this.priority
    }
    getId(){
        return this.id
    }
    finish(){
        this.done = true;
    }
    unfinish(){
        this.done = false
    }
    remove(){
        this.deleted = true
    }

}
