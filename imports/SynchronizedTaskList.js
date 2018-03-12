export default class SynchronizedTaskList {
    constructor(TaskList){
        this.taskList = TaskList;
        this.getAllTasks = this.taskList.getAllTasks.bind(taskList);
        this.getUnfinishedTasks = this.taskList.getUnfinishedTasks.bind(taskList);
        this.addListener = this.taskList.addListener.bind(taskList);
        this.removeListener = this.taskList.removeListener.bind(taskList);

    }

    createTask(description){
        this.taskList.createTask(description);
    }

    removeTask(task){
        this.taskList.removeTask();
    }

}