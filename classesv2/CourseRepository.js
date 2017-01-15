const AbstractRepository = require('./AbstractRepository');
const Course = require('./Course');

class CourseRepository extends AbstractRepository {
    loadById(courseId) {
        let courseData = this.loader().getCourseSync(courseId);
        return new Course(courseData);
    }

    save(course) {
        this.loader().saveCourseSync(course);
    }
}

module.exports = CourseRepository;
