

export default class TaskList{
    constructor(){
        this.tasks = [];
        this.listeners = [];
    }

    getAllTasks(){
        return this.tasks.slice();
    }

    getUnfinishedTasks(){
        return this.tasks.filter(task => !task.isDone());
    }

    createTask(description){
        const task = new Task(description);
        this.tasks.push(task);
        this.notifyListeners();
        task.addListener(this.taskChangeListener.bind(this));
        return task;
    }

    taskChangeListener(){
        this.notifyListeners();
    }

    addListener(newListener){
        this.listeners.push(newListener);
    }

    removeListener(oldListener){
        const index = this.listeners.indexOf(oldListener);
        if(index >= 0 ){
            this.listeners.splice(index, 1);
        }
    }

    notifyListeners(){
        this.listeners.map(listener => listener());
    }
}

export class Task{
    constructor(description){
        this.description = description;
        this.doneStatus = false;
        this.timeSpent = 0;
        this.listeners = [];
    }

    setDescription(description) {
        this.description = description;
        this.notifyListeners();
    }
    getDescription() {
        return this.description;
    }

    isDone(){
        return this.doneStatus;
    }

    getTimeSpent(){
        return this.timeSpent;
    }

    addTime(time){
        this.timeSpent += time;
        this.notifyListeners();
    }

    finish(){
        this.doneStatus = true;
        this.notifyListeners();
    }

    addListener(newListener){
        this.listeners.push(newListener);
    }

    removeListener(oldListener){
        const index = this.listeners.indexOf(oldListener);
        if(index >= 0 ){
            this.listeners.splice(index, 1);
        }
    }

    notifyListeners(){
        this.listeners.map(listener => listener());
    }
}