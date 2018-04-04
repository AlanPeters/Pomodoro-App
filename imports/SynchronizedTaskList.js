import TaskList from './TaskList.js';
import { Tasks }  from './api/Tasks.js';

export default class SynchronizedTaskList {
    constructor(){
        this.taskList = new TaskList();
        this.getAllTasks = this.taskList.getAllTasks.bind(this.taskList);
        this.getUnfinishedTasks = this.taskList.getUnfinishedTasks.bind(this.taskList);
        this.addListener = this.taskList.addListener.bind(this.taskList);
        this.removeListener = this.taskList.removeListener.bind(this.taskList);
    }

    createTask(description){
        const task = this.taskList.createTask(description);
        Tasks.insert(task.toJSON());
    }
}

export class SynchronizedTask{
    constructor(task){
        this.task = task;
        this.setDescription = this.task.setDescription.bind(this.task);
        this.getDescription = this.task.getDescription.bind(this.task);
        this.isDone = this.task.isDone.bind(this.task);
        this.getTimeSpent = this.task.getTimeSpent.bind(this.task);
        this.finish = this.task.finish.bind(this.task);
        this.addChangeListener = this.task.addChangeListener.bind(this.task);
        this.removeChangeListener = this.task.removeChangeListener.bind(this.task);
    }
    addTime(time){
        this.task.addTime(time);

    }

    fromJson(json){
        this.id = json.id;
    }
}