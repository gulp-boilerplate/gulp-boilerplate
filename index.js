var gulp = require('gulp'),
    gutil = require('gulp-util');

function loadTasks(config) {
    var tasks = Object.keys(config);
    tasks.forEach(function (name) {
        var taskConfig = config[name],
            task = require(taskConfig.def)(taskConfig);

        gulp.task(name, task);
    });

    return gulp;
}

module.exports = function (config) {
    if (config) {
        return loadTasks(config);
    }
    return loadTasks;
};
