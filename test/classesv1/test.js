'use strict';

// jshint esversion: 6

// jshint expr: true

// jshint -W117
const chai = require('chai');
const expect = chai.expect;

chai.should();

describe('number tests', () => {

    function isEven(num) {
        if (isNaN(num)) return NaN;
        return num % 2 === 0;
    }

    describe('isEven', () => {
        it('should return true when the number is even', () => {
            isEven(4).should.be.true;
        });

        it('should return false when the number is odd', () => {
            isEven(5).should.be.false;
        });

        it('should return NaN when the argument is not a number', () => {
            expect(isEven('l')).to.be.NaN;
            expect(isEven(NaN)).to.be.NaN;
        });
    });

    function add(num1, num2) {
        if (isNaN(num1) || isNaN(num2)) return NaN;
        if (typeof num1 === 'string' || typeof num2 === 'string') return NaN;
        return num1 + num2;
    }

    describe('add', () => {
        var five;

        beforeEach(() => {
            five = 5;
        });

        it('should be ten when adding 5 to 5', () => {
            expect(add(five, five)).to.equal(10);
        });

        it('should not be ten when adding 5 to 10', () => {
            expect(add(five, 10)).to.not.equal(10);
        });

        it('should be NaN when adding two strings', () => {
            expect(add(String(five), '1')).to.be.NaN;
        });

        it('should be NaN when adding a number to an object', () => {
            expect(add(five, {})).to.be.NaN;
        });

        it('should be NaN when adding a string to an object', () => {
            expect(add(String(five), {})).to.be.NaN;
        });

        it('should be 5.5 when adding 0.4 to 5.1', () => {
            expect(add(0.4, 5.1)).to.equal(5.5);
        });

        it('should be 4 when adding -1 to 5', () => {
            expect(add(-1, five)).to.equal(4);
        });

        it('should be 3 when adding -2 to 5', () => {
            expect(add(-2, five)).to.equal(3);
        });
    });

});
