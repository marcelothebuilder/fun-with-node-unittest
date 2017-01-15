//jshint -W030
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const Student = require('./../../classesv2/Student');

describe('Student', () => {
    it('should incorporate the provided object properties in itself', () => {
        let studentInfo = {
            id: 1,
            misc: {
                address: 'N/A'
            }
        };

        let student = new Student(studentInfo);

        expect(student.id).to.exist;
        expect(student.misc).to.exist;
        expect(student.misc.address).to.exist;
        expect(student.id).to.equal(1);
        expect(student.misc.address).to.equal('N/A');
    });
});
