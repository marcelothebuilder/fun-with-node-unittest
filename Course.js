class Course {
    static create(name, code, description) {
        let course = new Course();
        course.name = name;
        course.code = code;
        course.description = description;

        course.students = [];
        course.times = [];

        return course;
    }

    registerStudent(student) {
        this.students.push(student);
    }

    unregisterStudent(studentId) {
        let wasStudentRegistered = this.students.some((student, i) => {
            if (student.id === studentId) {
                this.students.splice(i, 1);
                return true;
            }
            return false;
        });

        if (!wasStudentRegistered) {
            throw new Error(`Student ${studentId} wasn't registered for this course`);
        }
    }

    addTimes(days, times) {
        if (!Array.isArray(days)) days = [days];
        if (!Array.isArray(times)) times = [times];

        days.forEach((day) => {
            times.forEach((time) => {
                this.times.push({
                    day: day,
                    time: time
                });
            });
        });
    }

    showSchedule() {
        let timeAndDayTextCollection = this.times.map((courseTimeAndDay) => {
            return `${courseTimeAndDay.day} at ${courseTimeAndDay.time}`;
        });

        return timeAndDayTextCollection.join('\n') + '\n';
    }

    showStudents() {
        let studentsTexts = this.students.map((student) => student.toString());
        return studentsTexts.join('\n') + '\n';
    }
}

module.exports = Course;
