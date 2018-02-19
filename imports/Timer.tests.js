import Timer from './Timer.js';
import { assert } from 'chai';
import { TIMER_STATE} from "./enums/TimerState";
import MockDate from 'mockdate';
import sinon from 'sinon';

describe('JSTImer', function () {
    describe('Constructor', function() {
        describe('Default Constructor', function (){

            it('creates new stopped timer', function(){
                const jstimer = new Timer();
                assert(!jstimer.isRunning());
            })

            it('sets length to 0', function () {
                const jstimer = new Timer();
                assert.equal(jstimer.getLength(), 0);
            });

            it('returns the proper json', function () {
                const jstimer = new Timer();
                const timerJson = jstimer.toJSON();
                assert.equal(timerJson.state, TIMER_STATE.STOPPED);
                assert.equal(timerJson.startTime, undefined);
                assert.equal(timerJson.length, 0);
            });
        });

        describe('Constructor with length', function(){
            it('creates new stopped timer', function(){
                const jstimer = new Timer({length: 2*60*1000});
                assert(!jstimer.isRunning());
            });

            it('sets the proper length', function() {
                const jstimer = new Timer({length: 2*60*1000});
                assert.equal(jstimer.getLength(), 2*60*1000);
            });
        });

        describe('Timer Started with constructor', function() {
            it('creates a running timer', function(){
                const jsTimer = new Timer({state: TIMER_STATE.RUNNING});
                assert(jsTimer.isRunning());
            });

            it('creates a start time if started without a start time', function(){
                MockDate.set('1/1/2000');
                const tempDate = new Date();
                const jsTimer = new Timer({state: TIMER_STATE.RUNNING});
                assert.equal(jsTimer.getStartTime().getTime(), tempDate.getTime());
                MockDate.reset();
            });
        });

    });

    describe('Timer Start Method', function(){
        var timer;
        var myMockDate;
        beforeEach(function(){
            MockDate.set('1/2/3000');
            myMockDate = new Date();
            timer = new Timer();
        });

        afterEach(function(){
            timer.destroy();
            MockDate.reset();
        });

        it('Start creates a start time', function(){
            assert.equal(timer.getStartTime(), undefined);
            timer.start();
            assert.equal(timer.getStartTime().getTime(), myMockDate.getTime());
        });
        it('Goes from stopped to running', function(){
            assert(!timer.isRunning());
            timer.start();
            assert(timer.isRunning());
        });
        it('Sets the state to running',function(){
            assert.equal(timer.getState(), TIMER_STATE.STOPPED);
            timer.start();
            assert.equal(timer.getState(), TIMER_STATE.RUNNING);
        });
    });


    describe('Test Sinon Interval', function(){
        it('Creates a fake clock',function(){
            this.clock = sinon.useFakeTimers();
            var mySpy = sinon.spy();
            setInterval(mySpy, 1000);
            this.clock.tick(1100);
            assert(mySpy.called);
            this.clock.restore();
        });
    });

    describe('Callback Interval', function(){
        var timer;
        var clock;
        var mySpy;
        beforeEach(function(){
            mySpy = sinon.spy();
            clock = sinon.useFakeTimers();
            timer = new Timer();
        });
        afterEach(function(){
            timer.destroy();
            clock.restore();
        });

        it('It should call the callback when started',function(){
            timer.setTickListener(mySpy);
            timer.start();
            assert(mySpy.called);
        });
        it('Calls the listener a second time withing 60ms', function(){
            timer.setTickListener(mySpy);
            timer.start();
            clock.tick(60);
            assert.equal(mySpy.callCount, 2);
        });
        it('Does not call the listener a third time before 1 second',function(){
            timer.setTickListener(mySpy);
            timer.start();
            clock.tick(300);
            clock.tick(200);
            clock.tick(499);
            assert.equal(mySpy.callCount,2);
        });
        it('Calls the callback a third time after 1 second',function(){
            timer.setTickListener(mySpy);
            timer.start();
            clock.tick(500);
            clock.tick(500);
            clock.tick(50);
            assert.equal(mySpy.callCount, 3);
        });
        it('Should stop calling the callback after it is removed', function(){
            timer.setTickListener(mySpy);
            timer.start();
            clock.tick(500);
            timer.removeTickListener();
            clock.tick(600);
            assert.equal(mySpy.callCount, 2);
            clock.tick(1200);
            assert.equal(mySpy.callCount, 2);
        });
        it('Should stop calling the callback after it is destroyed', function(){
            timer.setTickListener(mySpy);
            timer.start();
            clock.tick(500);
            timer.destroy();
            clock.tick(600);
            assert.equal(mySpy.callCount, 2);
            clock.tick(1200);
            assert.equal(mySpy.callCount, 2);
        });
    });

    describe('Timer Stop Method', function() {
        var timer;
        var myMockDate;
        beforeEach(function(){
            MockDate.set(0);
            myMockDate = new Date();
            timer = new Timer();
            timer.start();
        });

        afterEach(function(){
            timer.destroy();
            MockDate.reset();
        });

        it('Sets running to false', function() {
            assert(timer.isRunning());
            timer.stop();
            assert(!timer.isRunning());
        });
        it('Sets the state to stopped', function(){
            assert.equal(timer.getState(), TIMER_STATE.RUNNING);
            timer.stop();
            assert.equal(timer.getState(), TIMER_STATE.STOPPED);
        });
        it('Sets the length to the amount ot time remaining', function(){
            assert.equal(timer.getLength(), 0);
            MockDate.set(1000);
            timer.stop();
            assert.equal(timer.getLength(), -1000);
        });
    });
});