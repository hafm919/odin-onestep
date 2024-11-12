export default class Task{
    static globalTaskId = 0;
    constructor(title, date, priority) {
        this.title = title
        this.date = date
        this.priority = priority;
        this.id = Task.globalTaskId++;
    }
    print(){
        console.log(this.title,this.date,this.priority,this.id,Task.globalTaskId)
    }
}
