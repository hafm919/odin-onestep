export default class Task{
    static globalTaskId = 0;
    constructor(title, date, priority) {
        this.title = title
        this.date = date
        this.priority = priority;
        this.id = Task.globalTaskId++;
    }
    getTitle(){
        return this.title
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
}
