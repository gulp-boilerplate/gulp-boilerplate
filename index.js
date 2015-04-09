var localGulp, gulp,
    resolve = require('resolve');

try {
        localGulp = resolve.sync('gulp', {basedir: process.cwd()});
        gulp = require(localGulp);
} catch (e) {
        console.log('No local gulp found. Use npm install gulp');
        process.exit(1);
}

function loadTasks(config) {
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

module.exports = function (config) {
    if (config) {
        return loadTasks(config);
    }
    return loadTasks;
};
