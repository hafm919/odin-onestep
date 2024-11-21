 export default class Project{
    constructor(name,taskCount=0){
        this.tasks=[]
        this.name=name
        this.taskCount = taskCount
        this.deleted = false
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
    remove(){
        this.deleted = true;
    }

}