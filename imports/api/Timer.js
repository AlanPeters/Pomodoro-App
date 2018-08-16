import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Timer = new Mongo.Collection('timer');

if (Meteor.isServer) {
  Meteor.publish('timer', function() {
    return Timer.find({ owner: this.userId });
  });
}

Meteor.methods({

  'timer.insert'(timerState) {
    check(timerState, Object);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Timer.upsert(
      { owner: this.userId },
      {
        $set: {
          timerState,
          owner: this.userId,
        },
      },
    );
  },

  'timer.remove'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Timer.remove({ owner: this.userId });
  },

  'timer.update'(timerState) {
    check(timerState, Object);

    Timer.update(timerID, { $set: { timerState } });
  },
});
