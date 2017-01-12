const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const Student = require('../Student');
const Course = require('../Course');

describe("Student", () => {
    let name = 'Michael';
    let grade = 5;

    it("should save the info provided and generate an id on creation", () => {
        let student = Student.create(name, grade);

        should.exist(student.name);
        student.name.should.equal(name);

        should.exist(student.grade);
        student.grade.should.equal(grade);

        //jshint -W030
        should.exist(student.id);
    });

    it("should increase the student's grade by 1 when advanceGrade is called", () => {
        let student = Student.create(name, grade);

        student.advanceGrade();

        student.grade.should.equal(grade + 1);
    });
});
