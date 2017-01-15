const AbstractRepository = require('./AbstractRepository');
const Student = require('./Student');

class StudentRepository extends AbstractRepository {
    loadById(studentId) {
        let studentData = this.loader().getStudentSync(studentId);
        return new Student(studentId);
    }

    save(course) {
        this.loader().saveStudentSync(student);
    }
}

module.exports = StudentRepository;
