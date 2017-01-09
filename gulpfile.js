'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const gulputil = require('gulp-util');


gulp.task('mocha', () => {
    return gulp.src(['test/**/*.js'], {
            read: false
        })
        .pipe(mocha({
            reporter: 'list'
        }))
        .on('error', gulputil.log);
});

gulp.task('mocha:watch', ['mocha'], () => {
    return gulp.watch(['**/*.js', 'test/**/*.js'], ['mocha']);
});

gulp.task('default', ['mocha:watch']);
