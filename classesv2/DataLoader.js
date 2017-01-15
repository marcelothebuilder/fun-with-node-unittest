const fs = require('fs');
const FILE_NOT_FOUND = 'ENOENT';

class DataLoader {
    constructor() {

    }

    getStudent(studentId, callback) {
        let filePath = `./data/student/${studentId}.json`;

        fs.readFile(filePath, (error, data) => {
            if (error) {
                if (error.code && error.code === FILE_NOT_FOUND) {
                    throw new Error(`Student ${studentId} does not exist`);
                }

                throw err;
            }

            callback(JSON.parse(data));
        });
    }

    getStudentSync(studentId) {
        let filePath = `./data/student/${studentId}.json`;

        return JSON.parse(fs.readFileSync(filePath));
    }

    getStudentPromise(studentId) {
        return new Promise((resolve, reject) => {
            this.getStudent(studentId, (studentData) => {
                resolve(studentData);
            });
        });
    }

    getCourseSync() {}

    saveCourseSync() {}
}

module.exports = DataLoader;
