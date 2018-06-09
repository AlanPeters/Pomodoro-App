
import {Meteor} from 'meteor/meteor';
import {Timer } from './Timer.js';
import {TIMER_STATE} from "../Timer";
import { assert } from 'chai';

if(Meteor.isServer) {
    describe('Timer', () => {
        describe('methods', () => {

            let timerId;

            beforeEach(() => {
                Timer.remove({});
                timerId = Timer.insert({
                    timerLength: 60*25*1000,
                    timerState: TIMER_STATE.STOPPED,
                });
            });

            it('can delete timer', () => {
                assert.equal(Timer.find({}).count(), 1);
                Timer.remove(timerId);
                assert.equal(Timer.find({}).count(), 0);
            });
        });
    });
}