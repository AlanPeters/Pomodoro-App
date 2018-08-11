import { assert } from 'chai';
import sinon from 'sinon';
import { Tasks } from '../api/Tasks.js';
import SynchronizedTaskList from './SynchronizedTask.js';

describe('Synchronized Task List', function() {
  describe('Create Tasks', function() {
    let tasks;
    beforeEach(function() {
      tasks = sinon.spy(Tasks, 'insert');
    });
    afterEach(function() {
      tasks.restore();
    });
    it('Should call Tasks.Insert when a new task is added', function() {
      const taskList = new SynchronizedTaskList();
      taskList.createTask('Test');
      sinon.assert.calledOnce(tasks);
    });
  });
});
