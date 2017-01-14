const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const Course = require('../../classesv1/Course');
const Student = require('../../classesv1/Student');

describe("Course", () => {
    let name = "Unit testing node.js";
    let code = "UTN0001";
    let description = "Sample code on how to test with node";
    let course;
    let student;

    beforeEach(() => {
        course = Course.create(name, code, description);
        student = Student.create('Chris', 5);
    });

    it("should have an empty collection of students upon creation", () => {
        course.students.length.should.equal(0);
    });

    it("should have an empty collection of times upon creation", () => {
        course.times.length.should.equal(0);
    });

    it("should have the provided properties after creation", () => {
        course.name.should.equal(name);
        course.code.should.equal(code);
        course.description.should.equal(description);
    });

    describe("registerStudent", () => {
        it("should add the student to the students array", () => {
            course.registerStudent(student);

            course.students.length.should.equal(1);
            course.students[0].name.should.equal('Chris');
            course.students[0].id.should.equal(student.id);
        });
    });

    describe("unregisterStudent", () => {
        it("should throw an error if there's no student with the provided id registered", () => {
            expect(() => {
                course.unregisterStudent("");
            }).to.throw();
        });
    });

    describe("addTimes", () => {
        it("should add the given days/times to the course", () => {
            let days = ['Monday'];
            let times = ['11:30', '12:25'];

            course.addTimes(days, times);

            course.times.length.should.equal(2);

            course.times[0].should.eql({
                day: 'Monday',
                time: '11:30'
            });

            course.times[1].should.eql({
                day: 'Monday',
                time: '12:25'
            });
        });

        it("should throw an error if adding time with invalid format 1:30", () => {
            let days = ['Monday'];
            let times = ['1:30'];

            expect(() => {
                course.addTimes(days, times);
            }).to.throw();
        });

        it("should throw an error if adding time with invalid format 11130", () => {
            let days = ['Monday'];
            let times = ['11130'];

            expect(() => {
                course.addTimes(days, times);
            }).to.throw();
        });

        it("should throw an error if adding time with invalid format 1:130", () => {
            let days = ['Monday'];
            let times = ['1:130'];

            expect(() => {
                course.addTimes(days, times);
            }).to.throw();
        });

        it("should throw an error if adding time with invalid hour 99:30", () => {
            let days = ['Monday'];
            let times = ['99:30'];

            expect(() => {
                course.addTimes(days, times);
            }).to.throw();
        });

        it("should throw an error if adding time with invalid minute 01:99", () => {
            let days = ['Monday'];
            let times = ['01:99'];

            expect(() => {
                course.addTimes(days, times);
            }).to.throw();
        });

        it("should throw an error if adding an invalid day", () => {
            let days = ['Mondei'];
            let times = ['01:01'];

            expect(() => {
                course.addTimes(days, times);
            }).to.throw();
        });
    });
});
