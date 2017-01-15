class Registration {
    constructor(courseRepository, studentRepository) {
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
    }

    static create(courseRepository, studentRepository) {
        return new Registration(courseRepository, studentRepository);
    }

    registerStudentForCourse(studentId, courseId) {
        let course = this.courseRepository.loadById(courseId);

        course.students = course.students || [];

        if (course.maxSize && course.students.length >= course.maxSize) {
            throw new Error('Course is full');
        }

        let student = this.studentRepository.loadById(studentId);

        course.students.push(student);

        this.courseRepository.save(course);
        return course;
    }
}

module.exports = Registration;
