import { Meteor } from 'meteor/meteor';
import Timer from './Timer.js';

export default class SynchronizedTimer extends Timer {

  start(){
    super.start();
    Meteor.call('timer.insert', this.toJSON());
  }

  stop(){
    super.stop();
    Meteor.call('timer.insert', this.toJSON());
  }

  finish() {
    super.stop();
    Meteor.call('timer.remove');
  }
}
