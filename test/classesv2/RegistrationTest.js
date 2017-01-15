//jshint -W030
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const CourseRepository = require('./../../classesv2/CourseRepository');
const StudentRepository = require('./../../classesv2/StudentRepository');
const Registration = require('./../../classesv2/Registration');

chai.should();

describe('Registration', () => {
    let courseRepository;
    let studentRepository;
    let registration;

    beforeEach(() => {
        courseRepository = sinon.stub(new CourseRepository());
        studentRepository = sinon.stub(new StudentRepository());
        registration = Registration.create(courseRepository, studentRepository);

        studentRepository.loadById.returns({
            name: "Angelica",
            id: 1
        });
    });

    describe("when adding a student to a not full course", () => {
        beforeEach(() => {
            courseRepository.loadById
                .returns({
                    maxSize: 5,
                    students: [{
                        id: 5
                    }]
                });
        });

        it("should not throw an error", () => {
            expect(() => {
                registration.registerStudentForCourse(1, 1);
            }).to.not.throw();
        });

        it("should return an object", () => {
            (typeof registration.registerStudentForCourse(1, 1)).should.equal('object');
        });

        it("should return an object with property maxSize 5", () => {
            registration.registerStudentForCourse(1, 1).maxSize.should.equal(5);
        });

        it("should have saved the course using the repository", () => {
            registration.registerStudentForCourse(1, 1);
            sinon.assert.called(courseRepository.save);
        });
    });

    describe("when adding a student to a full course", () => {
        beforeEach(() => {
            courseRepository.loadById
                .returns({
                    maxSize: 1,
                    students: [{
                        id: 5
                    }]
                });
        });

        it("should throw an error", () => {
            expect(() => {
                registration.registerStudentForCourse(1, 1);
            }).to.throw(Error);
        });

        it("should not call repositories save", () => {
            expect(() => {
                registration.registerStudentForCourse(1, 1);
            }).to.throw(Error);

            sinon.assert.notCalled(studentRepository.save);
            sinon.assert.notCalled(courseRepository.save);
        });
    });
});
