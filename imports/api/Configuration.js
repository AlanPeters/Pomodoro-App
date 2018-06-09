import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Configuration = new Mongo.Collection('configuration');

Meteor.methods({

    'configuration.updateDefaultPomodoroLength'(lengthMs) {
        //TODO: check for negative values
        check(lengthMs, Number);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Configuration.upsert(
            {owner: this.userId},
            {
                $set: {
                    defaultTimerLength: lengthMs,
                }
            }
        );
    },

    'configuration.updateShortBreakDuration'(lengthMs) {
        check(lengthMs, Number);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Configuration.upsert(
            {owner: this.userId},
            {
                $set: {
                    shortBreakDuration: lengthMs,
                }
            });
    },

    'configuration.setCurrentAction'(type) {
        check(type, String);

        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Configuration.upsert(
            {owner: this.userId},
            {
                $set: {
                    currentAction: type,
                }
            }
        );
    }

});
