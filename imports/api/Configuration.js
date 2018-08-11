import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check, Match} from 'meteor/check';

export const Configuration = new Mongo.Collection('configuration');

if(Meteor.isServer){
    Meteor.publish('configuration', function(){
        return Configuration.find({owner: this.userId});
    });
}

Meteor.methods({

    'configuration.updatePomodoroDuration'(lengthMs) {
        //TODO: check for negative values
        check(lengthMs, Number);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Configuration.upsert(
            {owner: this.userId},
            {
                $set: {
                    pomodoroLength: lengthMs,
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
                    shortBreakLength: lengthMs,
                }
            });
    },

    'configuration.updateLongBreakDuration'(lengthMs) {
        check(lengthMs, Number);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Configuration.upsert(
            {owner: this.userId},
            {
                $set: {
                    longBreakLength: lengthMs,
                }
            }
        );
    },

    'configuration.updateLongBreakFrequency'(numPomodoros) {
        check(numPomodoros, Match.Integer);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Configuration.upsert(
            {owner: this.userId},
            {
                $set: {
                    longBreakFrequency: numPomodoros,
                }
            }
        );
    },

    'configuration.setCurrentAction'(activity) {
        check(activity, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Configuration.upsert(
            {owner: this.userId},
            {
                $set: {
                    currentActivity: activity,
                }
            }
        );
    },

    'configuration.setCurrentPomodoroCount'(count) {
        check(count, Match.Integer);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Configuration.upsert(
            {owner: this.userId},
            {
                $set: {
                    currentPomodoroCount: count,
                }
            }
        );
    },

});
