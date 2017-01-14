'use strict';

// jshint esversion: 6

// jshint expr: true

// jshint -W117
const chai = require('chai');
const expect = chai.expect;
chai.should();

const sinon = require('sinon');

describe('sinon tests', () => {
    var student, schedule;

    beforeEach(() => {
        student = {
            dropClass: (classId, callback) => {
                if (!!callback.dropClass && typeof callback.dropClass === 'function') {
                    callback.dropClass(classId);
                } else {
                    callback(classId);
                }

                // not yet implemented
            },
            addClass: (schedule) => {
                if (!schedule.classIsFull()) {
                    return true;
                }

                return false;
            }
        };

        schedule = {
            dropClass: () => undefined,
            classIsFull: () => true
        };
    });

    describe('student.dropClass', () => {
        it('should call the callback', () => {
            const spy = sinon.spy();
            student.dropClass(1, spy);
            spy.called.should.be.true;
        });

        it('should call the callback and log to the console', () => {
            const onClassDropped = () => undefined;

            const spy = sinon.spy(onClassDropped);

            student.dropClass(1, spy);
            spy.called.should.be.true;
        });

        it('should call the callback if a method is passed instead of a function', () => {
            const spy = sinon.spy(schedule.dropClass);

            student.dropClass(1, spy);
            spy.called.should.be.true;
        });

        it('should call the method dropClass if a object is passed instead of a function', () => {
            sinon.spy(schedule, 'dropClass');

            student.dropClass(1, schedule);

            schedule.dropClass.called.should.be.true;
        });
    });

    describe('student with stubs', () => {
        it('should call a stubbed method', () => {
            const stub = sinon.stub(schedule);
            student.dropClass(1, stub.dropClass);
            stub.dropClass.called.should.be.true;
        });

        it('should call a stubbed method passing the provided classId when provided the object itself', () => {
            const stub = sinon.stub(schedule);
            student.dropClass(1, stub);
            stub.dropClass.calledWith(1).should.be.true;
        });

        it('should call a stubbed method passing the provided classId when provided the method reference', () => {
            const stub = sinon.stub(schedule);
            student.dropClass(1, stub.dropClass);
            stub.dropClass.calledWith(1).should.be.true;
        });

        it('should return true when the class is not full - stubbing method', () => {
            const stub = sinon.stub(schedule, 'classIsFull');
            stub.returns(false);

            student.addClass(schedule).should.be.true;
        });

        it('should return true when the class is not full - stubbing whole obj', () => {
            const stub = sinon.stub(schedule);
            stub.classIsFull.returns(false);

            student.addClass(schedule).should.be.true;
        });

        it('should return false when the class is full', () => {
            const stub = sinon.stub(schedule);
            stub.classIsFull.returns(true);

            student.addClass(schedule).should.be.false;
        });
    });

    describe('student with mocks', () => {
        it('mocks schedule', () => {
            const mock = sinon.mock(schedule);

            const expectation = mock.expects('classIsFull').exactly(1);

            student.addClass(schedule);

            expectation.verify();

        });
    });
});
