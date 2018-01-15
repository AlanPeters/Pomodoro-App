import Timer from './Timer.js';
import { assert } from 'chai';

describe('JSTImer', function () {
    describe('Constructor', function (){
        it('creates new stopped timer', function(){
            const jstimer = new Timer();
            assert(!jstimer.isRunning());
        })
        it('sets length to 0', function () {
            const jstimer = new Timer();
            assert.equal(jstimer.getLength(), 0);
        });
    });
});