function loadTasks(gulp, config) {
    var tasks = Object.keys(config);
    tasks.forEach(function (name) {
        var taskConfig = config[name],
            task = require(taskConfig.def)(taskConfig),
            deps =  taskConfig.deps || [];

        if (deps.length !== 0) {
            gulp.task(name, taskConfig.deps, task);
        } else {
            gulp.task(name, task);
        }
    });

    return gulp;
}

module.exports = function (gulp, config) {
    if (config) {
        return loadTasks(gulp, config);
    }
    return loadTasks;
};
