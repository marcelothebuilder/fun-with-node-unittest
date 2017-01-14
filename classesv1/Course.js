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
            if (!this._isValidDay(day))
                throw new Error(`Provided day ${day} is invalid`);
        });

        times.forEach((time) => {
            if (!this._isValidTime(time))
                throw new Error(`Provided time ${time} is invalid`);
        });

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

    _isValidDay(day) {
        return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].indexOf(String(day).trim().toLowerCase()) !== -1;
    }

    _isValidTime(time) {
        if (time.length !== 5) return false;

        let parts = time.split(':');

        if (parts.length !== 2) return false;

        let hours = parts[0];
        let minutes = parts[1];

        if (hours.length !== 2) return false;
        if (minutes.length !== 2) return false;

        hours = parseInt(hours);
        minutes = parseInt(minutes);

        let isHoursValid = hours >= 0 && hours <= 23;
        if (!isHoursValid) return false;

        let isMinutesValid = minutes >= 0 && minutes <= 59;
        if (!isMinutesValid) return false;

        return true;
    }
}

module.exports = Course;
