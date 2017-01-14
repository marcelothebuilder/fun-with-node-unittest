const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const DataLoader = require('../../classesv1/DataLoader');

describe('DataLoader', () => {
    let dataLoader;

    beforeEach(() => {
        dataLoader = new DataLoader();
    });

    describe('when loading data synchronously', () => {
        it('should try to get data from student 1 without throwing errors', () => {
            expect(() => {
                dataLoader.getStudentSync(1);
            }).to.not.throw();
        });

        it('should try to get data from student 2 and throw an error', () => {
            expect(() => {
                dataLoader.getStudentSync(2);
            }).to.throw();
        });

        //jshint -W030
        it('should get student 1 with the expected properties', () => {
            let student = dataLoader.getStudentSync(1);
            expect(student.id).to.exist;
            expect(student.name).to.exist;
            expect(student.age).to.exist;
            expect(student.grade).to.exist;
        });
    });

    describe('when loading data asynchronously with callbacks', () => {
        it('should get student 1 with the expected properties', (done) => {
            //jshint -W030
            dataLoader.getStudent(1, (student) => {
                expect(student.id).to.exist;
                expect(student.name).to.exist;
                expect(student.age).to.exist;
                expect(student.grade).to.exist;
                done();
            });
        });
    });

    describe('when loading data asynchronously with promises', () => {
        it('should get student 1 with the expected properties', () => {
            //jshint -W030
            return dataLoader.getStudentPromise(1)
                .then((student) => {
                    expect(student.id).to.exist;
                    expect(student.name).to.exist;
                    expect(student.age).to.exist;
                    expect(student.grade).to.exist;
                });
        });
    });

});
