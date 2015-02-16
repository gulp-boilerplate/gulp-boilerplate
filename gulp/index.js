var gulp = require('gulp'),
    gutil = require('gulp-util');

module.exports = function (tasks, config) {
    tasks.forEach(function (name) {
        var taskConfig = config[name],
            task = require('./tasks/' + name)(taskConfig);

        gulp.task(name, task);
    });

    return gulp;
};
