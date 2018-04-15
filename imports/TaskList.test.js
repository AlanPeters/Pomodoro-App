import { assert } from 'chai';
import sinon from 'sinon';
import TaskList from './TaskList.js';
import { Task } from './TaskList.js';

describe('TaskList', function() {
    describe('Constructor', function(){
        describe('Default Constructor', function(){
            it('Creates an empty task list', function(){
                const list = new TaskList();
                assert.equal(list.getUnfinishedTasks().length, 0);
            });
        });
    });

    describe('Create Task', function(){
        it('Creates a new task and returns the new task', function(){
            const description = 'Test description';
            const taskList = new TaskList();
            const newTask = taskList.createTask(description);
            assert.equal(newTask.getDescription(),description);
        });

        it('Creates a task and adds it to the list', function(){
            const description = 'Test Description';
            const taskList = new TaskList();
            taskList.createTask(description);
            assert.equal(taskList.getUnfinishedTasks()[0].getDescription(), description);
        });
    });

    describe('Get All Tasks', function(){
        var taskList;
        var numberOfTasks;
        beforeEach(function() {
            taskList = new TaskList();
            numberOfTasks = 3;
            taskList.createTask('task 1');
            taskList.createTask('task 2');
            taskList.createTask('task 3');
        });
        it('gets all tasks', function(){
            var tasks = taskList.getAllTasks();
            assert.equal(tasks.length, numberOfTasks);
        });
        it('gets finished and unfinished tasks', function() {
            taskList.getAllTasks()[0].finish();
            var tasks = taskList.getAllTasks();
            assert.equal(tasks.length, numberOfTasks);
        });
    });

    describe('Get Unfinished Tasks', function(){
        var taskList;
        var numberOfTasks;
        beforeEach(function(){
            numberOfTasks = 3;
            taskList = new TaskList();
            taskList.createTask('task 1');
            taskList.createTask('task 2');
            taskList.createTask('task 3');
        });
        it('Gets all unfinished tasks', function() {
            var tasks = taskList.getUnfinishedTasks();
            assert.equal(tasks.length, numberOfTasks);
        });
        it('Gets only unfinished tasks', function() {
            taskList.getAllTasks()[0].finish();
            var tasks = taskList.getUnfinishedTasks();
            assert.equal(tasks.length, numberOfTasks - 1);
        });
    });

    describe('Task Changes', function(){
        var taskList;
        var mySpy;
        beforeEach(function(){
            taskList = new TaskList();
            mySpy = sinon.spy();
        });
        it('calls a listener when a new task is created', function() {
            taskList.addListener(mySpy);
            taskList.createTask('test');
            assert.equal(mySpy.callCount, 1);
        });
        it('calls a listener when a any of its tasks are changed', function(){
            const task = taskList.createTask('test');
            taskList.addListener(mySpy);
            task.finish();
            assert.equal(mySpy.callCount, 1);
        });
    });

    describe('Deleted Tasks', function(){
        var taskList;
        var mySpy;
        beforeEach(function(){
            taskList = new TaskList();
            mySpy = sinon.spy();
        });
        it('calls removes the deleted task from the list', function(){
            taskList = new TaskList();
            const task = taskList.createTask('test');
            assert.equal(taskList.getAllTasks().length, 1);
            task.delete();
            assert.equal(taskList.getAllTasks().length, 0);
        });
    });


});


describe('Task', function (){
    describe('Constructor',function(){
        var description;
        var task;
        beforeEach(function(){
            description = 'Test Task';
            task = new Task(description);
        });
        it('Creates a task with the given description', function(){
            assert.equal(task.getDescription(), description);
        });
        it('defaults the done status to false', function(){
            assert.equal(task.isDone(), false);
        });
        it('defaults the time spent to 0',function(){
            assert.equal(task.getTimeSpent(), 0);
        });
    });

    describe('addTime', function(){
        it('should add the passed in time to the total time', function(){
            const task = new Task('test');
            const time = 25*60*1000;
            task.addTime(time);
            assert.equal(task.getTimeSpent(), time);
            task.addTime(time);
            assert.equal(task.getTimeSpent(), time * 2);
        });
    });

    describe('Finish', function(){
        it('should mark the task as complete', function(){
            const task = new Task('finished');
            task.finish();
            assert.equal(task.isDone(), true);
        });
    });

    describe('setDescription',function(){
        it('should update the description', function(){
            const oldDescription = 'Old Description';
            const newDescription = 'New Description';
            const task = new Task(oldDescription);
            assert.equal(task.getDescription(),oldDescription);
            task.setDescription(newDescription);
            assert.equal(task.getDescription(),newDescription);
        });
    });

    describe('delete',function(){
        it('should call the delete listeners',function(){
            const task = new Task('test');
            const mySpy = sinon.spy();
            task.addDeleteListener(mySpy);
            task.delete();
            assert.equal(mySpy.callCount, 1);
        });
    });

    describe('Call Backs',function() {
        var description = 'Initial Description';
        var task;
        var mySpy;
        beforeEach(function(){
            mySpy = sinon.spy();
            task = new Task(description);
        });
        it('calls the change callback on a description change',function() {
            task.addChangeListener(mySpy);
            task.setDescription('New Description');
            assert.equal(mySpy.callCount,1);
        });
        it('calls the change callback on a time change', function() {
            task.addChangeListener(mySpy);
            task.addTime(1000);
            assert.equal(mySpy.callCount, 1);
        });
        it('calls the change callback on a finish event', function(){
            task.addChangeListener(mySpy);
            task.finish();
            assert.equal(mySpy.callCount, 1);
        });
        it('calls multiple registered change callbacks', function(){
            task.addChangeListener(mySpy);
            const mySpy2 = sinon.spy();
            task.addChangeListener(mySpy2);
            task.setDescription('new description');
            assert.equal(mySpy.callCount,1);
            assert.equal(mySpy2.callCount,1);
        });
        it('does not call a removed change callback', function() {
            task.addChangeListener(mySpy);
            task.setDescription('test');
            assert.equal(mySpy.callCount, 1);
            task.removeChangeListener(mySpy);
            task.setDescription('test 2');
            assert.equal(mySpy.callCount, 1);
        });
    });

    describe('To JSON', function(){
        it('Copies the state of to a json object', function(){
            const task = new Task('Test');
            const toJSON = task.toJSON();
            const expectedJSON = { description: 'Test',
            timeSpent: 0,
            doneStatus: false };
            assert.deepEqual(toJSON, expectedJSON);
            assert.equal(toJSON.description, expectedJSON.description);
            assert.equal(toJSON.timeSpent, expectedJSON.timeSpent);
            assert.equal(toJSON.doneStatus, expectedJSON.doneStatus);
        });
    });
    describe('From JSON', function(){
        it('creates a new Task with the passed in parameters', function(){
            const json = {
                description: 'Test Task',
                timeSpent: 2500,
                doneStatus: true,
            };
            const task = Task.fromJSON(json);
            assert.equal(task.getDescription(), json.description);
        });
    });
});