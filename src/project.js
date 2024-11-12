 export default class Project{
    constructor(name){
        this.tasks=[]
        this.name=name
    }
    getTasks(){
        return this.tasks
    }
    addTask(task){
        this.tasks.push(task)
    }
}