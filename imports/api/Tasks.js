import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {Match} from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({

    'tasks.add'(description) {
        check(description, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            description,
            isDone: false,
            timeSpent: 0,
            pomodoros: [],
            owner: this.userId,
        });
    },

    'tasks.setOrder'(taskId, order) {
        check(taskId, String);
        check(order, Match.Integer);

        Tasks.update(taskId, {
            $set: {order: order,}
        });
    },

    'tasks.addTime'(taskId, time) {
        check(taskId, String);
        check(time, Number);


        Tasks.update(taskId, {
            $inc: {
                timeSpent: time,
                pomodoros: 1,
            }
        });
    },

    'tasks.complete'(taskId) {
        check(taskId, String);

        Tasks.update(taskId, {
            $set: {isDone: true},
        });
    }


});

