

export default class TaskList{
    constructor(){
        this.tasks = [];
        this.changeListeners = [];
    }

    getAllTasks(){
        return this.tasks.slice();
    }

    getUnfinishedTasks(){
        return this.tasks.filter(task => !task.isDone());
    }

    createTask(description){
        const task = new Task(description);
        this.insertTask(task);
        return task;
    }

    insertTask(task){
        this.tasks.push(task);
        this.notifyListeners();
        task.addChangeListener(this.taskChangeListener.bind(this));
        task.addDeleteListener(() => this.removeTask.bind(this)(task));
    }

    removeTask(task){
        task.removeChangeListener(this.taskChangeListener.bind(this))
        const index = this.tasks.indexOf(task);
        if(index >= 0){
            this.tasks.splice(index, 1);
        }
        this.notifyListeners();
    }

    addListener(newListener){
        this.changeListeners.push(newListener);
    }

    removeListener(oldListener){
        const index = this.changeListeners.indexOf(oldListener);
        if(index >= 0 ){
            this.changeListeners.splice(index, 1);
        }
    }

    taskChangeListener(){
        this.notifyListeners();
    }

    notifyListeners(){
        this.changeListeners.map(listener => listener());
    }

}

export class Task{
    constructor(description){
        this.description = description;
        this.doneStatus = false;
        this.timeSpent = 0;
        this.changeListeners = [];
        this.deleteListeners = [];
    }

    setDescription(description) {
        this.description = description;
        this.notifyChangeListeners();
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
        this.notifyChangeListeners();
    }

    finish(){
        this.doneStatus = true;
        this.notifyChangeListeners();
    }

    addChangeListener(newListener){
        this.changeListeners.push(newListener);
    }

    removeChangeListener(oldListener){
        const index = this.changeListeners.indexOf(oldListener);
        if(index >= 0 ){
            this.changeListeners.splice(index, 1);
        }
    }

    notifyChangeListeners(){
        this.changeListeners.map(listener => listener());
    }

    addDeleteListener(newListener){
        this.deleteListeners.push(newListener);
    }

    removeDeleteListener(oldListener){
        const index = this.deleteListeners.indexOf(oldListener);
        if(index >= 0){
            this.deleteListeners.splice(index, 1);
        }
    }

    notifyDeleteListeners(){
        this.deleteListeners.map(listener => listener());
    }

    delete(){
        this.notifyDeleteListeners();
    }

    toJSON(){
        return {
            description: this.description,
            doneStatus: this.doneStatus,
            timeSpent: this.timeSpent,
        };
    }

    static fromJSON(json){
        const task = new Task(json.description);
        task.timeSpent = json.timeSpent;
        task.doneStatus = json.doneStatus;
        return task;
    }

}