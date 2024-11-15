 export default class Project{
    constructor(name){
        this.tasks=[]
        this.name=name
        this.taskCount = 0
    }
    getTasks(){
        return this.tasks
    }
    addTask(task){
        this.tasks.push(task)
        this.taskCount+=1
    }
    removeTask(){
        this.taskCount-=1
    }
    hasTasks(){
        if (this.taskCount>0){
            return true
        }
        return false
    }
}