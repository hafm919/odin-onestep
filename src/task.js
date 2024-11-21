export default class Task{
    static globalTaskId = 0;
    constructor(title, date, priority,done = false ,day = false,important= false) {
        this.title = title
        this.date = date
        this.priority = priority;
        this.id = Task.globalTaskId++;
        this.done = done;
        this.day = day;
        this.important = important;
        this.deleted = false;
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
    setTitle(title){
        this.title = title;
    }
    setDate(date){
         this.date = date;
    }
    setPriority(priority){
         this.priority = priority;
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
